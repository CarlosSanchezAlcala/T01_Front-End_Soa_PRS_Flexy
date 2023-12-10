import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FuncionaryService } from '../../component-funcionality/services/funcionary/funcionary.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionary } from '../../component-funcionality/models/funcionary/funcionary.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';
import { OperativeUnitService } from '../../component-funcionality/services/operativeUnit/operative-unit.service';

@Component({
  selector: 'app-funcionary-principal',
  templateUrl: './funcionary-principal.component.html',
  styleUrls: ['./funcionary-principal.component.scss'],
})
export class FuncionaryPrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('paginatorActive') paginator!: MatPaginator;
  @ViewChild('paginatorInactive') paginatorInactive!: MatPaginator;

  showFirstLastButtons: boolean = true;
  isDisabled: boolean = true;
  ubigeoData: any[] = [];
  operativeData: any[] = [];
  pdfSrc: SafeResourceUrl | null = null;
  funcionaryDataActive: any[] = [];
  funcionaryDataInactive: any[] = [];
  showDataActive = false;
  showDataInactive = false;
  selectedFuncionary: any;
  showDetails = false;
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'range',
    'confirmation',
    'actions',
    'moreInformation',
  ];

  dataSourceActive = new MatTableDataSource(this.funcionaryDataActive);
  dataSourceInactive = new MatTableDataSource(this.funcionaryDataInactive);

  constructor(
    public _funcionaryService: FuncionaryService,
    private _router: Router,
    private toastServices: HotToastService,
    private _operativeUnit: OperativeUnitService
  ) {}

  ngAfterViewInit(): void {
    //this.dataSourceActive.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.findAllDataCompleteFuncionary();
    this.findAllDataActiveFuncionary();
    this.findAllDataInactiveFuncionary();
    this.findAllDataUbigeoComplete();
    this.findAllDataOperativeUnit();
  }

  navigateToForm() {
    this._router.navigate(['funcionary-form']).then(() => {
      //console.log('Form for register.');
    });
  }

  getConfirmationLegalGuardian(confirmationLegalGuardian: string) {
    return confirmationLegalGuardian === 'S' ? 'Confirmado' : 'Rechazado';
  }

  findAllDataCompleteFuncionary() {
    this._funcionaryService.findAll().subscribe((DataFuncionaryBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataActiveFuncionary() {
    this._funcionaryService
      .findAllDataActive()
      .subscribe((DataFuncionaryBDActive: any) => {
        //console.log('Data funcionary Active:', DataFuncionaryBDActive);
        this.funcionaryDataActive = DataFuncionaryBDActive;
        this.dataSourceActive = new MatTableDataSource(
          this.funcionaryDataActive
        );
        this.dataSourceActive.paginator = this.paginator;
      });
  }

  findAllDataInactiveFuncionary() {
    this._funcionaryService
      .findAllDataInactive()
      .subscribe((dataFuncionaryInactive: any) => {
        this.funcionaryDataInactive = dataFuncionaryInactive;
        this.dataSourceInactive = new MatTableDataSource(
          this.funcionaryDataInactive
        );
        this.dataSourceInactive.paginator = this.paginatorInactive;
      });
  }

  findAllDataOperativeUnit() {
    this._operativeUnit
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        //console.log('Data Operative Unit:', dataOperativeUnit);
        this.operativeData = dataOperativeUnit;
      });
  }

  findAllDataUbigeoComplete() {
    this._funcionaryService
      .findAllDataUbigeoAddress()
      .subscribe((ubigeoData: any) => {
        this.ubigeoData = ubigeoData;
      });
  }

  getDataCompleteUbigeoInformation(codubi: string) {
    const ubigeo = this.ubigeoData.find((item) => item.codubi === codubi);
    if (ubigeo) {
      return `${ubigeo.depar} - ${ubigeo.provi} - ${ubigeo.distri}`;
    } else {
      return 'Ubigeo no encontrado.';
    }
  }

  getDataCompleteOperativeUnit(idOperativeUnit: number) {
    const soa = this.operativeData.find(
      (item) => item.id_operativeunit === idOperativeUnit
    );
    if (soa) {
      return `${soa.name}`;
    } else {
      return 'Unidad Operativa no encontrada.';
    }
  }

  deleteLogicalDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService
      .deleteLogicalDataFuncionary(funcionary)
      .subscribe((dataFuncionary: any) => {
        //console.log('Data Funcionary:', dataFuncionary);
        this.findAllDataActiveFuncionary();
        this.toastServices.error('Eliminado correctamente!');
      });
  }

  updateDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService.funcionarySelected = funcionary;
    this.navigateToForm();
    this.findAllDataActiveFuncionary();
  }

  reactiveDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService
      .reactiveLogicalDataFuncionary(funcionary)
      .subscribe((dataFuncionary: any) => {
        this.findAllDataInactiveFuncionary();
        this.toastServices.success('Reactivado correctamente!');
      });
  }

  showFuncionaryDetails(funcionary: any) {
    this.selectedFuncionary = funcionary;
    this.showDetails = true;
  }

  closeDetails() {
    this.selectedFuncionary = null;
    this.showDetails = false;
  }

  showActive() {
    this.showDataActive = true;
    this.hideInactive();
    this.findAllDataActiveFuncionary();
  }

  hideActive() {
    this.showDataActive = false;
  }

  showInactive() {
    this.showDataInactive = true;
    this.hideActive();
    this.findAllDataInactiveFuncionary();
  }

  hideInactive() {
    this.showDataInactive = false;
  }

  generarPDF(): void {
    this.toastServices.success('Generando PDF...', {
      duration: 3000,
    });

    setTimeout(() => {
      this._funcionaryService
        .generarPDF()
        .subscribe((response: ArrayBuffer) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const url = URL.createObjectURL(file);
          const pdfWindow = window.open();
          if (pdfWindow) {
            pdfWindow.location.href = url;
          } else {
            alert(
              'El navegador bloqueó la apertura de la ventana emergente. Por favor, asegúrate de desbloquear las ventanas emergentes para este sitio.'
            );
          }
        });
    }, 3500);
  }
}
