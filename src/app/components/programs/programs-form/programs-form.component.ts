import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-programs-form',
  templateUrl: './programs-form.component.html',
  styleUrls: ['./programs-form.component.scss']
})
export class ProgramsFormComponent implements OnDestroy, OnInit {

  funcionaryDataForm: FormGroup = new FormGroup({});
  ubigeoData: any[] = [];

  constructor(//public _programService: ProgramService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.funcionaryDataForm = this._fb.group({
      id_funcionary: [null],
      name: ['', Validators.required],
      type: ['', Validators.required],
      beneficiary: ['', Validators.required],
      responsible: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['A']
    });
    /*if (this._programService.funcionarySelected) {
      this.funcionaryDataForm.patchValue(this._programService.funcionarySelected);
    }*/
  }

  ngOnInit(): void {
  }

  navigateToList() {
    this._router.navigate(['program']).then(() => {
      console.log('Funcionary List.')
    })
  }


  saveOrUpdateFuncionary() {
    /*if (this._programService.funcionarySelected) {
      // Actualizar || Modificar
      this.updateDataFuncionary();
    } else {
      // Registrar || Crear
      this.registerNewDataFuncionary();
    }*/
  }

  registerNewDataFuncionary() {
    /*console.log('Datos ingresados en el formulario: ', this.funcionaryDataForm.value);
    this._programService.saveNewFuncionary(this.funcionaryDataForm.value).subscribe((dataNewFuncionary: any) => {
      console.log('New Data Funcionary: ', dataNewFuncionary)
      this.navigateToList();
    });*/
  }

  updateDataFuncionary() {
    /*console.log('Datos ingresados en el formulario: ', this.funcionaryDataForm.value);
    this._programService.updateDataFuncionary(this.funcionaryDataForm.value).subscribe((dataUpdateFuncionary: any) => {
      //console.log('Update Data Funcionary: ', dataUpdateFuncionary)
      this.funcionaryDataForm.reset();
      this.navigateToList();
    });*/
  }

  ngOnDestroy(): void {
    /*this._programService.funcionarySelected = undefined;*/
  }

}
