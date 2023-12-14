import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeenService } from '../../component-funcionality/services/teen/teen.service';
import { AsignationService } from '../../component-funcionality/services/asignation/asignation.service';
import { FuncionaryService } from '../../component-funcionality/services/funcionary/funcionary.service';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Asignation } from '../../component-funcionality/models/asignation/asignation.model';

@Component({
  selector: 'app-teen-form',
  templateUrl: './teen-form.component.html',
  styleUrls: ['./teen-form.component.scss'],
})
export class TeenFormComponent implements OnInit, OnDestroy {
  teenDataForm: FormGroup = new FormGroup({});
  legalGuardianAsignationFrom: FormGroup = new FormGroup({});
  funcionaryData: any[] = [];
  attorneyData: any[] = [];
  operativeUnitData: any[] = [];
  teenData: any[] = [];
  ubigeoData: any[] = [];
  idTeenNecesaryForRegisterAsignation: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public teenServices: TeenService,
    public _asignationServices: AsignationService,
    private _asignationDataFuncionaryService: FuncionaryService,
    public dialog: MatDialog,
    private toastService: HotToastService
  ) {
    this.teenDataForm = this.fb.group({
      id_teen: [null],
      identifier: [''],
      name: ['', Validators.required],
      surnameFather: ['', Validators.required],
      surnameMother: ['', Validators.required],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      birthade: ['', Validators.required],
      gender: ['', Validators.required],
      id_operativeunit: ['', Validators.required],
      crimeCommitted: ['', Validators.required],
      id_attorney: ['', Validators.required],
      codubi: ['', Validators.required],
      date_hour_register: [''],
      status: ['A'],
    });
    this.legalGuardianAsignationFrom = this.fb.group({
      id_funcionaryteend: [null],
      id_funcionary: [''],
      idTeen: [''],
      status: ['A'],
      function_start: [''],
      description: [''],
    });
    if (this.teenServices.teenSelected) {
      this.teenDataForm.patchValue(this.teenServices.teenSelected);
    }
  }

  ngOnInit(): void {
    this.findAllDataActive();
    this.findAllDataFuncionaryRankLegalGuardian();
    this.findAllDataUbigeo();
    this.findAllDataAttorney();
    this.findAllDataOperativeUnit();
    this.loadAsignationDataForTeen();
  }

  loadAsignationDataForTeen() {
    if (this.teenDataForm.get('id_teen')) {
      const id_teen = this.teenDataForm.get('id_teen')?.value;

      console.log('Identifier principal: ', id_teen);

      this._asignationServices.findAsignationByTeenId(id_teen).subscribe(
        (data: Asignation) => {
          // Actualiza los controles del formulario con los datos de la asignación
          this.legalGuardianAsignationFrom.patchValue({
            id_funcionaryteend: data.id_funcionaryteend,
            id_funcionary: data.id_funcionary,
            idTeen: data.idTeen,
            status: data.status,
            function_start: data.function_start,
            description: data.description,
          });

          console.log('Asignation data:', data);
        },
        (error) => {
          console.error('Error fetching asignation data:', error);
        }
      );
    }
  }

  navigateToTeenList() {
    this.router.navigate(['teen']).then(() => {
      //console.log('Successful navigation to Teen List');
    });
  }

  findAllDataFuncionaryRankLegalGuardian() {
    this._asignationDataFuncionaryService
      .findDataRankLegalGuardian()
      .subscribe((dataLegalGuardianRank: any) => {
        // console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank); --------- // Running successfully
        this.funcionaryData = dataLegalGuardianRank;
      });
  }

  findAllDataAttorney() {
    this.teenServices
      .findAllDataAttorney()
      .subscribe((dataFindAttorney: any) => {
        // console.log('Data Attorney: ', dataFindAttorney); //--------- // Running successfully
        this.attorneyData = dataFindAttorney;
      });
  }

  findAllDataOperativeUnit() {
    this.teenServices
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
      });
  }

  findAllDataUbigeo() {
    this.teenServices
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeo: any) => {
        // console.log('Ubigeo Data: ', dataUbigeo); --------- // Running successfully
        this.ubigeoData = dataUbigeo;
      });
  }

  findAllDataActive() {
    this.teenServices.findAllDataActive().subscribe((dataTeenActive: any) => {
      // console.log('Estos son los datos en modo activos que se están recibiendo de la Base de Datos: ', dataTeenActive); --------- // Running successfully
      this.teenData = dataTeenActive;
    });
  }

  saveTeen() {
    if (this.teenServices.teenSelected) {
      // Update || Modify
      this.updateDataTeen();
    } else {
      // Recording || Create
      this.registerNewDataTeenAndAsignation();
    }
  }

  registerNewDataTeenAndAsignation() {
    //console.log('Datos ingresados en el formulario: ', this.teenDataForm.value);
    this.teenServices.saveNewTeen(this.teenDataForm.value).subscribe((teendataRegister: any) => {
        
      //console.log('Los datos ingresados dentro del formulario para registrar || crear son: ', teendataRegister);
        this.idTeenNecesaryForRegisterAsignation = teendataRegister.id_teen;
        
        console.log('The last id Teen is: ',this.idTeenNecesaryForRegisterAsignation);

        this.legalGuardianAsignationFrom.patchValue({
          idTeen: this.idTeenNecesaryForRegisterAsignation,
        });

        console.log('Data for table Asignation: ',this.legalGuardianAsignationFrom.value);

        // Register in Transactional
        this._asignationServices.saveNewAsignation(this.legalGuardianAsignationFrom.value).subscribe((dataAsignationForFormTeen: any) => {
            
          console.log('Data for register in Transactional is: ',dataAsignationForFormTeen);

            this.teenDataForm.reset();
            this.legalGuardianAsignationFrom.reset();

            this.navigateToTeenList();
            this.toastService.success('Registro exitoso!');
            this.findAllDataActive();
            this.dialog.closeAll();
          });
      });
  }

  updateDataTeen() {
    console.log('Only Data Form: ', this.teenDataForm.value);
    this.teenServices
      .updateDataTeen(this.teenDataForm.value)
      .subscribe((dataUpdate) => {
        console.log('Data Form for Modify | Update: ', dataUpdate);

        // Actualiza la asignación con los nuevos datos del formulario
        const asignationData = this.legalGuardianAsignationFrom.value;
        this._asignationServices.updateDataAsignation(asignationData).subscribe(
          (asignationUpdate) => {
            console.log('Asignation data updated:', asignationUpdate);
          },
          (error) => {
            console.error('Error updating asignation data:', error);
          }
        );

        this.teenDataForm.reset();
        this.navigateToTeenList();
        this.toastService.success('Actualización de datos exitosa!');
        this.dialog.closeAll();
      });
  }

  ngOnDestroy() {
    this.teenServices.teenSelected = undefined;
    this._asignationServices.asignationSelected = undefined;
  }
}
