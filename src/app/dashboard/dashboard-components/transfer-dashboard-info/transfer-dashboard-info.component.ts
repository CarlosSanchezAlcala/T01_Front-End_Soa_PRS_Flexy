import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeenService } from '../../../components/component-funcionality/services/teen/teen.service';
import { OperativeUnitService } from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';
import { Teen } from '../../../components/component-funcionality/models/teen/teen.model';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OperativeUnit } from '../../../components/component-funcionality/models/operativeUnit/operativeUnit.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferTeenService } from '../../../components/component-funcionality/services/transfer/transfer-teen.service';
import { TransferTeen } from '../../../components/component-funcionality/models/transfer/transferTeen.model';
import { HotToastService } from '@ngneat/hot-toast';
import { AsignationService } from '../../../components/component-funcionality/services/asignation/asignation.service';
import { Asignation } from '../../../components/component-funcionality/models/asignation/asignation.model';
import { FuncionaryService } from '../../../components/component-funcionality/services/funcionary/funcionary.service';
import { Funcionary } from 'src/app/components/component-funcionality/models/funcionary/funcionary.model';

@Component({
  selector: 'app-transfer-dashboard-info',
  templateUrl: './transfer-dashboard-info.component.html',
  styleUrls: ['./transfer-dashboard-info.component.scss'],
})
export class TransferDashboardInfoComponent implements OnInit {
  @Output() transferTeens: EventEmitter<any> = new EventEmitter<any>();

  //Opciones del autocompletado para el Adolescente (Teen)
  filteredOptionsTeen!: Observable<any[]>;
  searchControlTeen = new FormControl();

  //Opciones del autocompletado para las Unidades Operativas (Operative Unit)
  filteredOptionsOperativeUnit!: Observable<any[]>;
  searchControlOperativeUnit = new FormControl();

  //Otras opciones (Recolección de Datos)
  showTransferForm = false;
  teenData: any[] = [];
  funcionaryData: Funcionary[] = [];
  operativeUnitData: any[] = [];

  //Formularios (Transfer | Asignation)
  formForTransfer: FormGroup = new FormGroup({});
  asignationFormInTransfer: FormGroup = new FormGroup({});
  funcionaryFormData: FormGroup = new FormGroup({});

  uuidTeenNecesaryForUpdate: any[] = [];

  file: File | null = null;
  fileName: string = '';
  currentDate: Date = new Date();

  selectedSoa: any[] = [];
  selectedFuncionary: any[] = [];
  funcionaryDataFilter: any[] = [];

  //Data complete of Funcionary in Data Base
  funcionaryDataComplete: any[] = [];

  documentoUrl = '';

  showPdfViewer: boolean = true;

  idTeenNecesaryForRegisterTransfer: any[] = [];

  constructor(
    private _teenService: TeenService,
    private _transferTeenService: TransferTeenService,
    private _operativeUnitService: OperativeUnitService,
    private _funcionaryService: FuncionaryService,
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private toastService: HotToastService,
    private _asignationService: AsignationService
  ) {
    this.formForTransfer = this._fb.group({
      id_teen: ['', Validators.required],
      id_operativeunit: ['', Validators.required],
      documentPDF: ['', Validators.required],
      id_funcionary: [''],
    });
    // Form Asignation - Not used
    this.asignationFormInTransfer = this._fb.group({
      id_funcionaryteend: [''],
      id_funcionary: [''],
      idTeen: [''],
      status: ['A'],
      function_start: [''],
      description: [''],
    });
    this.funcionaryFormData = this._fb.group({
      id_funcionary: [''],
      name: [''],
      surnameFather: [''],
      surnameMother: [''],
      dni: [''],
      phoneNumber: [''],
      range: [''],
      confirmation: ['N'],
      address: [''],
      email: [''],
      codubi: [''],
      idOperativeUnit: [''],
      status: ['A'],
    });

    this.formForTransfer.get('documentPDF')?.valueChanges.subscribe((value) => {
      // Asegúrate de que 'value' no sea nulo antes de intentar hacer match
      if (value) {
        // Extraer el ID del enlace de vista previa
        const match = value.match(/\/file\/d\/(.*?)\/view/);

        if (match && match[1]) {
          const id = match[1];
          this.documentoUrl = `https://drive.google.com/uc?export=download&id=${id}`;
          console.log('Id Document: ', id);
          console.log('Url Document: ', this.documentoUrl);

        } else {
          console.error('No se pudo extraer el ID del enlace.');
        }
      }
    });
  }

  ngOnInit(): void {
    this.findAllDataTeen();
    this.findAllDataOperativeUnit();
    this.autoCompleteData();
    this.notificationsTransferTeen();
    this.dateAndHour();
    this.findAllDataCompleteOfFuncionary();
  }

  loadFuncionaryDataForTransfer(idOperativeUnit: number) {
    if (this.formForTransfer.get('id_operativeunit')) {
      console.log('Id Operative Unit: ', idOperativeUnit);

      this._funcionaryService
        .findDataFuncionaryByIdSoa(idOperativeUnit)
        .subscribe(
          (dataFuncionary: any) => {
            this.funcionaryFormData.patchValue({
              id_funcionary: dataFuncionary.id_funcionary,
              name: dataFuncionary.name,
              surnameFather: dataFuncionary.surnameFather,
              surnameMother: dataFuncionary.surnameMother,
              dni: dataFuncionary.dni,
              phoneNumber: dataFuncionary.phoneNumber,
              range: dataFuncionary.range,
              confirmation: dataFuncionary.confirmation,
              address: dataFuncionary.address,
              email: dataFuncionary.email,
              codubi: dataFuncionary.codubi,
              idOperativeUnit: dataFuncionary.idOperativeUnit,
              status: dataFuncionary.status,
            });

            console.log('Funcionary Data: ', dataFuncionary);
          },

          (error) => {
            console.log('Error fetching funcionary data:', error);
          }
        );
    }
  }

  /*
  changeFuncionaryByIdSoa() {
    console.log('SOA Data: ', this.formForTransfer.value);
  }
  */

  findAllDataCompleteOfFuncionary() {
    this._funcionaryService
      .findAllDataActive()
      .subscribe((dataComplete: any) => {
        console.log('Data Complete of Funcionary: ', dataComplete);
        this.funcionaryDataComplete = dataComplete;
      });
  }

  onSoaChange(): void {

    const idOperativeUnitSelectedOfForm =
      this.formForTransfer.get('id_operativeunit')?.value;

    console.log('Id Operative Unit: ', idOperativeUnitSelectedOfForm);

    this._funcionaryService
      .findDataFuncionaryByIdSoa(idOperativeUnitSelectedOfForm)
      .subscribe(
        (dataFuncionary: any) => {
          console.log('Funcionary Data: ', dataFuncionary);
          this.funcionaryDataFilter = dataFuncionary;
        },
      );

    //this.formForTransfer.get('id_operativeunit')?.setValue(idOperativeUnit);
    //this.loadFuncionaryDataForTransfer(idOperativeUnit);
  }

  showToast() {
    this.toastService.show('Hello World!');
  }

  onFileClick() {
    const fileInput = document.getElementById('file');
    // @ts-ignore
    fileInput.click();
  }

  dateAndHour() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  autoCompleteData() {
    this.filteredOptionsTeen = this.searchControlTeen.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string'
          ? value
          : value && value.name
            ? this._filter(value.name)
            : this.teenData.slice()
      ),
      map((name) =>
        typeof name === 'string' ? this._filter(name) : this.teenData.slice()
      )
    );
    this.filteredOptionsOperativeUnit =
      this.searchControlOperativeUnit.valueChanges.pipe(
        startWith(''),
        map((value) =>
          typeof value === 'string'
            ? value
            : value && value.name
              ? this._filterOperativeUnit(value.name)
              : this.operativeUnitData.slice()
        ),
        map((name) =>
          typeof name === 'string'
            ? this._filterOperativeUnit(name)
            : this.operativeUnitData.slice()
        )
      );
  }

  notificationsTransferTeen() {
    const alertMessage = localStorage.getItem('alertMessage');
    if (alertMessage) {
      this.openSnackBar(alertMessage, 'Cerrar');
      localStorage.removeItem('alertMessage');
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const dTeen = event.option.value;
    this.searchControlTeen.setValue(
      dTeen.name + ' ' + dTeen.surnameFather + ' ' + dTeen.surnameMother
    );
    this.formForTransfer.get('id_teen')?.setValue(dTeen.id_teen);
  }

  onOptionSelectedOperativeUnit(event: MatAutocompleteSelectedEvent) {
    const dOperativeUnit = event.option.value;
    this.searchControlOperativeUnit.setValue(dOperativeUnit.name);
    this.formForTransfer
      .get('id_operativeunit')
      ?.setValue(dOperativeUnit.id_operativeunit);
  }

  private _filter(name: string): Teen[] {
    const filterValue = name.toLowerCase();
    return this.teenData.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterOperativeUnit(name: string): OperativeUnit[] {
    const filterValueOperativeUnit = name.toLowerCase();
    return this.operativeUnitData.filter(
      (option) =>
        option.name.toLowerCase().indexOf(filterValueOperativeUnit) === 0
    );
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
    this.searchControlTeen.reset();
    this.searchControlOperativeUnit.reset();
    this.formForTransfer.reset();
    this.showPdfViewer = false;
  }

  openSnackBar(message: string, action: string, callback?: () => void) {
    this.snackBar
      .open(message, action, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })
      .afterDismissed()
      .subscribe(() => {
        if (callback) {
          callback();
        }
      });
  }

  onSubmitForm() {

    const idTeenSelectedOfForm = this.formForTransfer.get('id_teen')?.value;
    const idOperativeUnitSelectedOfForm = this.formForTransfer.get('id_operativeunit')?.value;
    const infoTeenDateAndTimeRegister = this.formForTransfer.get('dateAndTimeRegister')?.value;
    const idFuncionarySelectedOfForm = this.formForTransfer.get('id_funcionary')?.value;

    console.log('Id Teen: ', idTeenSelectedOfForm);
    console.log('Id Funcionary: ', idFuncionarySelectedOfForm);

    const selectedTeenInForm = this.teenData.find((item) => item.id_teen === idTeenSelectedOfForm);

    const teen: Teen = {
      id_teen: idTeenSelectedOfForm,
      identifier: '',
      name: selectedTeenInForm.name,
      surnameFather: selectedTeenInForm.surnameFather,
      surnameMother: selectedTeenInForm.surnameMother,
      dni: selectedTeenInForm.dni,
      phoneNumber: selectedTeenInForm.phoneNumber,
      address: selectedTeenInForm.address,
      email: selectedTeenInForm.email,
      birthade: selectedTeenInForm.birthade,
      gender: selectedTeenInForm.gender,
      id_operativeunit: idOperativeUnitSelectedOfForm,
      crimeCommitted: selectedTeenInForm.crimeCommitted,
      id_attorney: selectedTeenInForm.id_attorney,
      codubi: selectedTeenInForm.codubi,
      date_hour_register: infoTeenDateAndTimeRegister,
      status: selectedTeenInForm.status,
    };

    const teenRegister: Teen = {
      name: selectedTeenInForm.name,
      surnameFather: selectedTeenInForm.surnameFather,
      surnameMother: selectedTeenInForm.surnameMother,
      dni: selectedTeenInForm.dni,
      phoneNumber: selectedTeenInForm.phoneNumber,
      address: selectedTeenInForm.address,
      email: selectedTeenInForm.email,
      birthade: selectedTeenInForm.birthade,
      gender: selectedTeenInForm.gender,
      id_operativeunit: idOperativeUnitSelectedOfForm,
      crimeCommitted: selectedTeenInForm.crimeCommitted,
      id_attorney: selectedTeenInForm.id_attorney,
      codubi: selectedTeenInForm.codubi,
      date_hour_register: infoTeenDateAndTimeRegister,
      status: selectedTeenInForm.status,
    };

    const dataForTransferTeen: TransferTeen = {
      id_teen: idTeenSelectedOfForm,
      document_pdf_office: this.formForTransfer.get('documentPDF')?.value,
    };

    this._teenService.transferDataTeen(teen).subscribe((dataTeenTransfer) => {
      //console.log('Teen Transfer: ', dataTeenTransfer);
      this.hideForm();

      this._asignationService.deleteLogicalDataAsignation(idTeenSelectedOfForm).subscribe((dataInactiveAsignation: any) => {
        console.log('Asignación Eliminada: ', dataInactiveAsignation);
      });
    });

    this._transferTeenService.saveNewTransferTeen(dataForTransferTeen).subscribe((dataTransferTeenSave) => {
      console.log('Data Transfer: ', dataTransferTeenSave);
    });

    this._teenService.saveNewTeen(teenRegister).subscribe((dataTeenSave: any) => {
      //this.uuidTeenNecesaryForUpdate = dataTeenSave;
      console.log('Teen Save: ', dataTeenSave);
      console.log('Id Teen: ', dataTeenSave.id_teen);
      const idOfNewTeen = dataTeenSave.id_teen;
      console.log('Id Teen: ', idOfNewTeen);

      const asignation: Asignation = {
        id_funcionary: idFuncionarySelectedOfForm,
        idTeen: idOfNewTeen,
        function_start: this.asignationFormInTransfer.get('function_start')?.value,
        description: this.asignationFormInTransfer.get('description')?.value,
      };

      console.log('Asignation: ', asignation);

      this._asignationService.saveNewAsignation(asignation).subscribe((dataAsignationSave) => {
        console.log('Data of new Asignation: ', dataAsignationSave);
      });

      //localStorage.setItem('alertMessage', 'Se registró correctamente'); -> Sirve como notificación para el usuario (DESHABILITADO POR EL NUEVO USO DE TOAST)

      this.toastService.success('Transferencia exitosa!');
      this.transferTeens.emit(dataTeenSave);
    });

    this.showPdfViewer = false;
    this.formForTransfer.reset();
  }

  findAllDataTeen() {
    this._teenService.findAllDataActive().subscribe((dataReceivedTeen: any) => {
      console.log('Data teen: ', dataReceivedTeen);
      this.teenData = dataReceivedTeen;
    });
  }

  findAllDataOperativeUnit() {
    this._operativeUnitService
      .findAllDataOperativeUnit()
      .subscribe((dataReceivedOperativeUnit: any) => {
        console.log('Data Operative Unit: ', dataReceivedOperativeUnit);
        this.operativeUnitData = dataReceivedOperativeUnit;
      });
  }
}
