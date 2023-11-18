import {Component, OnInit, ViewChild} from '@angular/core';
import {FuncionaryService} from '../../component-funcionality/services/funcionary/funcionary.service';
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Funcionary} from "../../component-funcionality/models/funcionary/funcionary.model";

@Component({
  selector: 'app-funcionary-principal',
  templateUrl: './funcionary-principal.component.html',
  styleUrls: ['./funcionary-principal.component.scss']
})
export class FuncionaryPrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorInactive!: MatPaginator;

  ubigeoData: any[] = [];
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
    'moreInformation'
  ];

  dataSourceActive = new MatTableDataSource(this.funcionaryDataActive);
  dataSourceInactive = new MatTableDataSource(this.funcionaryDataInactive);

  constructor(public _funcionaryService: FuncionaryService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.findAllDataCompleteFuncionary();
    this.findAllDataActiveFuncionary();
    this.findAllDataInactiveFuncionary();
    this.findAllDataUbigeoComplete();
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
        this.dataSourceActive = new MatTableDataSource(this.funcionaryDataActive);
        this.dataSourceActive.paginator = this.paginator;
      });
  }

  findAllDataInactiveFuncionary() {
    this._funcionaryService.findAllDataInactive().subscribe((dataFuncionaryInactive: any) => {
      this.funcionaryDataInactive = dataFuncionaryInactive;
      this.dataSourceInactive = new MatTableDataSource(this.funcionaryDataInactive);
      this.dataSourceInactive.paginator = this.paginatorInactive;
    })
  }

  findAllDataUbigeoComplete() {
    this._funcionaryService.findAllDataUbigeoAddress().subscribe((ubigeoData: any) => {
      this.ubigeoData = ubigeoData;
    })
  }

  getDataCompleteUbigeoInformation(codubi: string) {
    const ubigeo = this.ubigeoData.find((item) => item.codubi === codubi);
    if (ubigeo) {
      return `${ubigeo.depar} - ${ubigeo.provi} - ${ubigeo.distri}`;
    } else {
      return 'Ubigeo no encontrado.'
    }
  }

  deleteLogicalDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService.deleteLogicalDataFuncionary(funcionary).subscribe((dataFuncionary: any) => {
      //console.log('Data Funcionary:', dataFuncionary);
      this.findAllDataActiveFuncionary();
    });
  }

  updateDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService.funcionarySelected = funcionary;
    this.navigateToForm();
    this.findAllDataActiveFuncionary();
  }

  reactiveDataFuncionary(funcionary: Funcionary) {
    this._funcionaryService.reactiveLogicalDataFuncionary(funcionary).subscribe((dataFuncionary: any) => {
      this.findAllDataInactiveFuncionary();
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

}
