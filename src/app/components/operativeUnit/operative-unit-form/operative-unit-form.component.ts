import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OperativeUnitService} from "../../component-funcionality/services/operativeUnit/operative-unit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-operative-unit-form',
  templateUrl: './operative-unit-form.component.html',
  styleUrls: ['./operative-unit-form.component.scss']
})
export class OperativeUnitFormComponent implements OnInit, OnDestroy {

  funcionaryDataForm: FormGroup = new FormGroup({});
  ubigeoData: any[] = [];

  constructor(public _operativeunitService: OperativeUnitService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.funcionaryDataForm = this._fb.group({
      id_funcionary: [null],
      name: ['', Validators.required],
      director: ['', Validators.required],
      phonenumber: ['', Validators.required],
      address: ['', Validators.required],
      codubi: [''],
      status: ['A'],
    });
    /*if (this._operativeunitService.funcionarySelected) {
      this.funcionaryDataForm.patchValue(this._operativeunitService.funcionarySelected);
    }*/
  }

  ngOnInit(): void {
    this.findAllDataUbigeoForRegister();
  }

  navigateToList() {
    this._router.navigate(['operativeunit']).then(() => {
      console.log('Funcionary List.')
    })
  }

  findAllDataUbigeoForRegister() {
    /*this._operativeunitService.findAllDataUbigeoAddress().subscribe((dataUbigeoForRegister: any) => {
      this.ubigeoData = dataUbigeoForRegister;
    })*/
  }

  saveOrUpdateFuncionary() {
    /*f (this._operativeunitService.funcionarySelected) {
      // Actualizar || Modificar
      this.updateDataFuncionary();
    } else {
      // Registrar || Crear
      this.registerNewDataFuncionary();
    }*/
  }

  registerNewDataFuncionary() {
    /*console.log('Datos ingresados en el formulario: ', this.funcionaryDataForm.value);
    this._operativeunitService.saveNewFuncionary(this.funcionaryDataForm.value).subscribe((dataNewFuncionary: any) => {
      console.log('New Data Funcionary: ', dataNewFuncionary)
      this.navigateToList();
    });*/
  }

  updateDataFuncionary() {
    /*console.log('Datos ingresados en el formulario: ', this.funcionaryDataForm.value);
    this._operativeunitService.updateDataFuncionary(this.funcionaryDataForm.value).subscribe((dataUpdateFuncionary: any) => {
      //console.log('Update Data Funcionary: ', dataUpdateFuncionary)
      this.funcionaryDataForm.reset();
      this.navigateToList();
    });*/
  }

  ngOnDestroy(): void {
    /*this._operativeunitService.funcionarySelected = undefined;*/
  }

}
