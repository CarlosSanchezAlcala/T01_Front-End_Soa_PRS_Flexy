import {Component, OnInit, ViewChild} from '@angular/core';
import { OperativeUnitService } from 'src/app/components/component-funcionality/services/operativeUnit/operative-unit.service';
import {MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-operative-unit-dashboard-info',
  templateUrl: './operative-unit-dashboard-info.component.html',
  styleUrls: ['./operative-unit-dashboard-info.component.scss'],
})
export class OperativeUnitDashboardInfoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  operativeUnitData: any[] = [];
  funcionaryData: any[] = [];
  displayedColumns: string[] = [
    'name',
    'funcionaryRegistered',
  ];

  // Manejar el paginator de la tabla (Teen)
  dataSource = new MatTableDataSource(this.funcionaryData);

  constructor(public _operativeUnitService: OperativeUnitService) {}

  ngOnInit(): void {
    this.findAllDataCompleteOperativeUnit();
    this.findAllDataCompleteFuncionary();
  }

  findAllDataCompleteOperativeUnit() {
    this._operativeUnitService
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
        this.dataSource = new MatTableDataSource(this.operativeUnitData);
        this.dataSource.paginator = this.paginator;
      });
  }

  findAllDataCompleteFuncionary() {
    this._operativeUnitService
      .findAllDataFuncionary()
      .subscribe((dataFuncionary: any) => {
        //console.log('Funcionarios: ', dataFuncionary);
        this.funcionaryData = dataFuncionary;
      });
  }

  getDataInformationCompleteFuncionary(id_funcionary: number) {
    const funcionary = this.funcionaryData.find((item) => item.id_funcionary === id_funcionary);
    if (funcionary) {
      return `${funcionary.name} ${funcionary.surnameFather} ${funcionary.surnameMother}`;
    } else {
      return 'Funcionario no encontrado.';
    }
  }

  getDataFuncionaryInBD(id_funcionary: number) {
    const funcionary = this.funcionaryData.find(
      (item) => item.id_funcionary === id_funcionary
    );
    if (funcionary) {
      return `${funcionary.name} ${funcionary.surnameFather} ${funcionary.surnameMother}`;
    } else {
      return 'Director no encontrado.';
    }
  }
}
