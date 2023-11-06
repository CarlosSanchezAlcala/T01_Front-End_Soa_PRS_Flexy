import { Component, OnInit } from '@angular/core';
import { TeenService } from '../component-funcionality/services/teen/teen.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuncionaryService } from '../component-funcionality/services/funcionary/funcionary.service';
import { Asignation } from '../component-funcionality/models/asignation/asignation.model';
import { AsignationService } from '../component-funcionality/services/asignation/asignation.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teen-principal',
  templateUrl: './teen-principal.component.html',
  styleUrls: ['./teen-principal.component.scss'],
})
export class TeenPrincipalComponent implements OnInit {
  teenData: any[] = [];
  showTransferForm = false;
  attorneyData: any[] = [];
  operativeUnitData: any[] = [];
  funcionaryData: any[] = [];
  teenDataForm: FormGroup = new FormGroup({});
  legalGuardianAsignationFrom: FormGroup = new FormGroup({});
  ubigeoData: any[] = [];
  idTeenNecesaryForRegisterAsignation: any[] = [];
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'operativeUnit',
    'email',
    'attorney',
  ];

  constructor(
    public _teenService: TeenService,
    private _fb: FormBuilder,
    public _funcionaryService: FuncionaryService,
    public _asignationService: AsignationService,
    private _dialog: MatDialog
  ) {
    this.teenDataForm = this._fb.group({
      id_teen: [null],
      name: [''],
      surnameFather: [''],
      surnameMother: [''],
      dni: [''],
      phoneNumber: [''],
      address: [''],
      email: [''],
      birthade: [''],
      gender: [''],
      id_operativeunit: [''],
      crimeCommitted: [''],
      id_attorney: [''],
      codubi: [''],
      status: ['A'],
    });
    this.legalGuardianAsignationFrom = this._fb.group({
      id_funcionaryteend: [null],
      id_funcionary: [''],
      id_teen: [''],
      status: ['A'],
      description: [''],
    });
    if (this._teenService.teenSelected) {
      this.teenDataForm.patchValue(this._teenService.teenSelected);
    }
  }

  ngOnInit(): void {
    this.findAllDataCompleteTeen();
    this.findAllDataActiveTeen();
    this.findAllDataCompleteOperativeUnit();
    this.findAllDataCompleteAttorney();
    this.findAllDataAttorney();
    this.findAllDataUbigeo();
    this.findAllDataFuncionaryRankLegalGuardian();
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
  }

  findAllDataFuncionaryRankLegalGuardian() {
    this._funcionaryService
      .findDataRankLegalGuardian()
      .subscribe((dataLegalGuardianRank: any) => {
        // console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank); --------- // Running successfully
        this.funcionaryData = dataLegalGuardianRank;
      });
  }

  findAllDataAttorney() {
    this._teenService
      .findAllDataAttorney()
      .subscribe((dataFindAttorney: any) => {
        // console.log('Data Attorney: ', dataFindAttorney); //--------- // Running successfully
        this.attorneyData = dataFindAttorney;
      });
  }

  findAllDataCompleteTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataUbigeo() {
    this._teenService
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeo: any) => {
        // console.log('Ubigeo Data: ', dataUbigeo); --------- // Running successfully
        this.ubigeoData = dataUbigeo;
      });
  }

  findAllDataActiveTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBDActive: any) => {
      //console.log('Data Teen Active:', DataTeenBDActive);
      this.teenData = DataTeenBDActive;
    });
  }

  findAllDataCompleteOperativeUnit() {
    this._teenService
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
      });
  }

  findAllDataCompleteAttorney() {
    this._teenService.findAllDataAttorney().subscribe((dataAttorney: any) => {
      this.attorneyData = dataAttorney;
    });
  }

  getDataInformationOperativeUnit(id_operativeunit: number) {
    const soa = this.operativeUnitData.find(
      (item) => item.id_operativeunit === id_operativeunit
    );
    if (soa) {
      return `${soa.name}`;
    } else {
      return 'Unidad Operativa asignada no fue encontrada.';
    }
  }

  getDataInformationAttorney(id_attorney: number) {
    const attorney = this.attorneyData.find(
      (item) => item.id_attorney === id_attorney
    );
    if (attorney) {
      return `${attorney.name} ${attorney.surnameFather} ${attorney.surnameMother}`;
    } else {
      return 'Apoderado asignado no fue encontrado.';
    }
  }

  saveTeen() {
    if (this._teenService.teenSelected) {
      // Update || Modify
      this.updateDataTeen();
      window.location.reload();
    } else {
      // Recording || Create
      this.registerNewDataTeenAndAsignation();
      window.location.reload();
    }
  }

  registerNewDataTeenAndAsignation() {
    console.log('Datos ingresados en el formulario: ', this.teenDataForm.value);
    this._teenService
      .saveNewTeen(this.teenDataForm.value)
      .subscribe((teendataRegister: any) => {
        console.log(
          'Los datos ingresados dentro del formulario para registrar || crear son: ',
          teendataRegister
        );
        this.idTeenNecesaryForRegisterAsignation = teendataRegister.id_teen;
        console.log(
          'The last id Teen is: ',
          this.idTeenNecesaryForRegisterAsignation
        );

        this.legalGuardianAsignationFrom.patchValue({
          id_teen: this.idTeenNecesaryForRegisterAsignation,
        });

        console.log(
          'Data in Form for Asignation is: ',
          this.legalGuardianAsignationFrom.value
        );

        this._asignationService
          .saveNewAsignation(this.legalGuardianAsignationFrom.value)
          .subscribe((dataAsignationForFormTeen: any) => {
            console.log(
              'Data for register in Transactional is: ',
              dataAsignationForFormTeen
            );

            this.teenDataForm.reset();
            this.legalGuardianAsignationFrom.reset();
            this.findAllDataActiveTeen();
            this._dialog.closeAll();
          });
      });
  }

  updateDataTeen() {
    console.log('Only Data Form: ', this.teenDataForm.value);
    this._teenService
      .updateDataTeen(this.teenDataForm.value)
      .subscribe((dataUpdate) => {
        console.log('Data Form for Modify | Update: ', dataUpdate);
        this.teenDataForm.reset();
        this._dialog.closeAll();
      });
  }

  ngOnDestroy() {
    this._teenService.teenSelected = undefined;
    this._asignationService.asignationSelected = undefined;
  }
}
