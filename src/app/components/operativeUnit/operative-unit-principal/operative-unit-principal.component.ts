import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {SafeResourceUrl} from "@angular/platform-browser";
import {MatTableDataSource} from "@angular/material/table";
import {OperativeUnitService} from "../../component-funcionality/services/operativeUnit/operative-unit.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {OperativeUnit} from "../../component-funcionality/models/operativeUnit/operativeUnit.model";

@Component({
  selector: 'app-operative-unit-principal',
  templateUrl: './operative-unit-principal.component.html',
  styleUrls: ['./operative-unit-principal.component.scss']
})
export class OperativeUnitPrincipalComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorInactive!: MatPaginator;

  pdfSrc: SafeResourceUrl | null = null;
  operationalunitDataActive: any[] = [];
  operationalunitDataInactive: any[] = [];
  showDataActive = false;
  showDataInactive = false;
  selectedoperationalunit: any;
  showDetails = false;
  ubigeoData: any[] = [];
  displayedColumns: string[] = [
    'name',
    'director',
    'phonenumber',
    'address',
    'codubi',
    'actions',
    'moreInformation'
  ];

  dataSourceActive = new MatTableDataSource(this.operationalunitDataActive);
  dataSourceInactive = new MatTableDataSource(this.operationalunitDataInactive);

  constructor(public _operationalunitService: OperativeUnitService,
              private _router: Router, private toastServices: HotToastService) {
  }

  ngOnInit(): void {
    this.findAllDataCompleteOperationalUnit();
    this.findAllDataActiveOperationalUnit();
    this.findAllDataInactiveOperationalUnit();
    this.findAllDataUbigeo();
  }

  navigateToForm() {
    this._router.navigate(['operativeUnitForm']).then(() => {
      //console.log('Form for register.');
    });
  }


  generarPDF(): void {
    this.toastServices.success('Generando PDF...', {
      duration: 3000,
    });

    setTimeout(() => {
      this._operationalunitService
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

  findAllDataCompleteOperationalUnit() {
    /*this._operationalunitService.findAll().subscribe((DataFuncionaryBD: any) => {
      console.log('Data Teen:', DataFuncionaryBD);
    });*/
  }

  findAllDataActiveOperationalUnit() {
    /*this._operationalunitService
      .findAllDataActive()
      .subscribe((DataFuncionaryBDActive: any) => {
        //console.log('Data funcionary Active:', DataFuncionaryBDActive);
        this.operationalunitDataActive = DataFuncionaryBDActive;
        this.dataSourceActive = new MatTableDataSource(this.operationalunitDataActive);
        this.dataSourceActive.paginator = this.paginator;
        console.log('Data Source Active: ', this.dataSourceActive);
        console.log('Data Source Active: ', DataFuncionaryBDActive);
      });*/
  }

  findAllDataInactiveOperationalUnit() {
    /*this._operationalunitService.findAllDataInactive().subscribe((dataFuncionaryInactive: any) => {
      this.operationalunitDataInactive = dataFuncionaryInactive;
      this.dataSourceInactive = new MatTableDataSource(this.operationalunitDataInactive);
      this.dataSourceInactive.paginator = this.paginatorInactive;
      console.log('Data Source Inactive: ', this.dataSourceInactive);
    });*/
  }

  deleteLogicalDataFuncionary(operativeunit: OperativeUnit) {
    /*this._operationalunitService.deleteLogicalDataFuncionary(operativeunit).subscribe((dataFuncionary: any) => {
      //console.log('Data Funcionary:', dataFuncionary);
      this.findAllDataActiveOperationalUnit();
    });*/
  }

  updateDataFuncionary(operativeunit: OperativeUnit) {
    /*this._operationalunitService.funcionarySelected = operativeunit;
    this.navigateToForm();
    this.findAllDataActiveOperationalUnit();*/
  }

  reactiveDataFuncionary(operativeunit: OperativeUnit) {
    /*this._operationalunitService.reactiveLogicalDataFuncionary(operativeunit).subscribe((dataFuncionary: any) => {
      this.findAllDataInactiveOperationalUnit();
    });*/
  }


  findAllDataUbigeo() {
    /*this._operationalunitService
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeo: any) => {
        console.log('Ubigeo Data: ', dataUbigeo); // Running successfully
        this.ubigeoData = dataUbigeo;
      });*/
  }

  getDataCompleteUbigeoBD(codubi: string) {
    const ubigeo = this.ubigeoData.find((item) => item.codubi === codubi);
    if (ubigeo) {
      return `${ubigeo.depar} - ${ubigeo.provi} - ${ubigeo.distri}`;
    } else {
      return 'Ubigeo no encontrado.';
    }
  }

  showFuncionaryDetails(operativeunit: any) {
    this.selectedoperationalunit = operativeunit;
    this.showDetails = true;
  }

  closeDetails() {
    this.selectedoperationalunit = null;
    this.showDetails = false;
  }

  showActive() {
    this.showDataActive = true;
    this.hideInactive();
    this.findAllDataCompleteOperationalUnit();
  }

  hideActive() {
    this.showDataActive = false;
  }

  showInactive() {
    this.showDataInactive = true;
    this.hideActive();
    this.findAllDataInactiveOperationalUnit();
  }

  hideInactive() {
    this.showDataInactive = false;
  }

}
