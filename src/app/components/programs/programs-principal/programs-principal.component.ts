import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Program} from "../../component-funcionality/models/programs/programsAsistant.model";

@Component({
  selector: 'app-programs-principal',
  templateUrl: './programs-principal.component.html',
  styleUrls: ['./programs-principal.component.scss']
})
export class ProgramsPrincipalComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorInactive!: MatPaginator;

  programDataActive: any[] = [];
  programDataInactive: any[] = [];
  showDataActive = false;
  showDataInactive = false;
  selectedprogram: any;
  showDetails = false;
  displayedColumns: string[] = [
    'name',
    'type',
    'beneficiary',
    'responsible',
    'description',
    'duration',
    'actions',
    'moreInformation'
  ];

  dataSourceActive = new MatTableDataSource(this.programDataActive);
  dataSourceInactive = new MatTableDataSource(this.programDataInactive);

  constructor(//public _operationalunitService: ProgramService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.findAllDataCompleteOperationalUnit();
    this.findAllDataActiveOperationalUnit();
    this.findAllDataInactiveOperationalUnit();
  }

  navigateToForm() {
    this._router.navigate(['programsAsitForm']).then(() => {
      //console.log('Form for register.');
    });
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
        this.programDataActive = DataFuncionaryBDActive;
        this.dataSourceActive = new MatTableDataSource(this.programDataActive);
        this.dataSourceActive.paginator = this.paginator;
        console.log('Data Source Active: ', this.dataSourceActive);
        console.log('Data Source Active: ', DataFuncionaryBDActive);
      });*/
  }

  findAllDataInactiveOperationalUnit() {
    /*this._operationalunitService.findAllDataInactive().subscribe((dataFuncionaryInactive: any) => {
      this.programDataInactive = dataFuncionaryInactive;
      this.dataSourceInactive = new MatTableDataSource(this.programDataInactive);
      this.dataSourceInactive.paginator = this.paginatorInactive;
      console.log('Data Source Inactive: ', this.dataSourceInactive);
    });*/
  }

  deleteLogicalDataFuncionary(program: Program) {
    /*this._operationalunitService.deleteLogicalDataFuncionary(program).subscribe((dataFuncionary: any) => {
      //console.log('Data Funcionary:', dataFuncionary);
      this.findAllDataActiveOperationalUnit();
    });*/
  }

  updateDataFuncionary(program: Program) {
    /*this._operationalunitService.funcionarySelected = program;
    this.navigateToForm();
    this.findAllDataActiveOperationalUnit();*/
  }

  reactiveDataFuncionary(program: Program) {
    /*his._operationalunitService.reactiveLogicalDataFuncionary(program).subscribe((dataFuncionary: any) => {
      this.findAllDataInactiveOperationalUnit();
    });*/
  }

  showFuncionaryDetails(operativeunit: any) {
    this.selectedprogram = operativeunit;
    this.showDetails = true;
  }

  closeDetails() {
    this.selectedprogram = null;
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
