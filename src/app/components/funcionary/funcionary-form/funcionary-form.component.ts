import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionaryService } from '../../component-funcionality/services/funcionary/funcionary.service';
import { Router } from '@angular/router';
import { Funcionary } from '../../component-funcionality/models/funcionary/funcionary.model';
import { HotToastService } from '@ngneat/hot-toast';
import { OperativeUnitService } from '../../component-funcionality/services/operativeUnit/operative-unit.service';

@Component({
  selector: 'app-funcionary-form',
  templateUrl: './funcionary-form.component.html',
  styleUrls: ['./funcionary-form.component.scss'],
})
export class FuncionaryFormComponent implements OnInit, OnDestroy {
  funcionaryDataForm: FormGroup = new FormGroup({});
  ubigeoData: any[] = [];
  operativeUnitDataComplete: any[] = [];

  constructor(
    public _funcionaryService: FuncionaryService,
    private _router: Router,
    private _fb: FormBuilder,
    private toastService: HotToastService,
    private _operativeUnit: OperativeUnitService
  ) {
    this.funcionaryDataForm = this._fb.group({
      id_funcionary: [null],
      name: ['', Validators.required],
      surnameFather: ['', Validators.required],
      surnameMother: ['', Validators.required],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      range: ['', Validators.required],
      confirmation: ['N'],
      address: ['', Validators.required],
      email: ['', Validators.required],
      codubi: ['', Validators.required],
      idOperativeUnit: ['', Validators.required],
      status: ['A'],
    });
    if (this._funcionaryService.funcionarySelected) {
      this.funcionaryDataForm.patchValue(
        this._funcionaryService.funcionarySelected
      );
    }
  }

  ngOnInit(): void {
    this.findAllDataUbigeoForRegister();
    this.findAllDataCompleteOperativeUnit();
  }

  navigateToList() {
    this._router.navigate(['funcionary']).then(() => {
      //console.log('Funcionary List.');
    });
  }

  findAllDataUbigeoForRegister() {
    this._funcionaryService
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeoForRegister: any) => {
        this.ubigeoData = dataUbigeoForRegister;
      });
  }

  findAllDataCompleteOperativeUnit() {
    this._operativeUnit
      .findAllDataOperativeUnit()
      .subscribe((dataCompleteOperativeUnit: any) => {
        this.operativeUnitDataComplete = dataCompleteOperativeUnit;
      });
  }

  saveOrUpdateFuncionary() {
    if (this._funcionaryService.funcionarySelected) {
      // Actualizar || Modificar
      this.updateDataFuncionary();
    } else {
      // Registrar || Crear
      this.registerNewDataFuncionary();
    }
  }

  registerNewDataFuncionary() {
    //console.log('Datos ingresados en el formulario: ',this.funcionaryDataForm.value);
    this._funcionaryService
      .saveNewFuncionary(this.funcionaryDataForm.value)
      .subscribe((dataNewFuncionary: any) => {
        //console.log('New Data Funcionary: ', dataNewFuncionary)
        this.funcionaryDataForm.reset();
        this.navigateToList();
        this.toastService.success('Registro exitoso!');
      });
  }

  updateDataFuncionary() {
    //console.log('Datos ingresados en el formulario: ', this.funcionaryDataForm.value);
    this._funcionaryService
      .updateDataFuncionary(this.funcionaryDataForm.value)
      .subscribe((dataUpdateFuncionary: any) => {
        //console.log('Update Data Funcionary: ', dataUpdateFuncionary)
        this.funcionaryDataForm.reset();
        this.navigateToList();
        this.toastService.success('Registro actualizado correctamente!');
      });
  }

  ngOnDestroy(): void {
    this._funcionaryService.funcionarySelected = undefined;
  }
}
