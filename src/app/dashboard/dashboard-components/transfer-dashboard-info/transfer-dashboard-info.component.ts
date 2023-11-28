import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TeenService} from "../../../components/component-funcionality/services/teen/teen.service";
import {
  OperativeUnitService
} from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';
import {Teen} from "../../../components/component-funcionality/models/teen/teen.model";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {OperativeUnit} from "../../../components/component-funcionality/models/operativeUnit/operativeUnit.model";
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransferTeenService} from "../../../components/component-funcionality/services/transfer/transfer-teen.service";
import {TransferTeen} from "../../../components/component-funcionality/models/transfer/transferTeen.model";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-transfer-dashboard-info',
  templateUrl: './transfer-dashboard-info.component.html',
  styleUrls: ['./transfer-dashboard-info.component.scss']
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
  operativeUnitData: any[] = [];
  formForTransfer: FormGroup = new FormGroup({});

  file: File | null = null;
  fileName: string = '';
  currentDate: Date = new Date();

  idTeenNecesaryForRegisterTransfer: any[] = [];

  constructor(private _teenService: TeenService,
              private _transferTeenService: TransferTeenService,
              private _operativeUnitService: OperativeUnitService,
              private _fb: FormBuilder,
              private snackBar: MatSnackBar,
              private toastService: HotToastService,
  ) {
    this.formForTransfer = this._fb.group({
      id_teen: [''],
      id_operativeunit: [''],
      documentPDF: [''],
    });
  }

  ngOnInit(): void {
    this.findAllDataTeen();
    this.findAllDataOperativeUnit();
    this.autoCompleteData();
    this.notificationsTransferTeen();
    this.dateAndHour();
  }

  showToast() {
    this.toastService.show('Hello World!')
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name; // Guarda el nombre del archivo
      this.formForTransfer.get('documentPDF')?.setValue(file);
    }
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
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.teenData.slice())
    );
    this.filteredOptionsOperativeUnit = this.searchControlOperativeUnit.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterOperativeUnit(name) : this.operativeUnitData.slice())
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
    this.searchControlTeen.setValue(dTeen.name + ' ' + dTeen.surnameFather + ' ' + dTeen.surnameMother);
    this.formForTransfer.get('id_teen')?.setValue(dTeen.id_teen);
  }

  onOptionSelectedOperativeUnit(event: MatAutocompleteSelectedEvent) {
    const dOperativeUnit = event.option.value;
    this.searchControlOperativeUnit.setValue(dOperativeUnit.name);
    this.formForTransfer.get('id_operativeunit')?.setValue(dOperativeUnit.id_operativeunit);
  }

  private _filter(name: string): Teen[] {
    const filterValue = name.toLowerCase();
    return this.teenData.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterOperativeUnit(name: string): OperativeUnit[] {
    const filterValueOperativeUnit = name.toLowerCase();
    return this.operativeUnitData.filter(option => option.name.toLowerCase().indexOf(filterValueOperativeUnit) === 0);
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
    this.searchControlTeen.reset();
    this.searchControlOperativeUnit.reset();
  }

  openSnackBar(message: string, action: string, callback?: () => void) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    }).afterDismissed().subscribe(() => {
      if (callback) {
        callback();
      }
    });
  }

  onSubmitForm() {
    const idTeenSelectedOfForm = this.formForTransfer.get('id_teen')?.value;
    const idOperativeUnitSelectedOfForm = this.formForTransfer.get('id_operativeunit')?.value;

    const selectedTeenInForm = this.teenData.find((item) => item.id_teen === idTeenSelectedOfForm);

    const teen: Teen = {
      id_teen: idTeenSelectedOfForm,
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
      status: selectedTeenInForm.status,
    };

    const dataForTransferTeen: TransferTeen = {
      id_teen: idTeenSelectedOfForm,
      document_pdf_office: this.formForTransfer.get('documentPDF')?.value,
      date_hour_register: this.formForTransfer.get('dateAndTimeRegister')?.value,
    };

    this._teenService.transferDataTeen(teen).subscribe((dataTeenTransfer) => {
      //console.log('Teen Transfer: ', dataTeenTransfer);
      this.hideForm();
    });

    this._transferTeenService.saveNewTransferTeen(dataForTransferTeen).subscribe((dataTransferTeenSave) => {
      console.log('Data Transfer: ', dataTransferTeenSave);
    });

    this._teenService.saveNewTeen(teen).subscribe((dataTeenSave) => {
      //console.log('Teen Save: ', dataTeenSave);
      //localStorage.setItem('alertMessage', 'Se registró correctamente'); -> Sirve como notificación para el usuario (DESHABILITADO POR EL NUEVO USO DE TOAST)
      this.toastService.success('Transferencia exitosa!')
      this.transferTeens.emit(dataTeenSave);
    });
  }

  findAllDataTeen() {
    this._teenService
      .findAllDataActive()
      .subscribe((dataReceivedTeen: any) => {
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
