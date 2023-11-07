import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeenService} from 'src/app/components/component-funcionality/services/teen/teen.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-teen-dashboard-info',
  templateUrl: './teen-dashboard-info.component.html',
  styleUrls: ['./teen-dashboard-info.component.scss'],
})
export class TeenDashboardInfoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  teenData: any[] = [];
  operativeUnitData: any[] = [];
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'operativeUnit',
  ];

  // Manejar el paginator de la tabla (Teen)
  dataSource = new MatTableDataSource(this.teenData);

  constructor(public _teenService: TeenService) {
  }

  ngOnInit(): void {
    this.findAllDataCompleteTeen();
    this.findAllDataActiveTeen();
    this.findAllDataCompleteOperativeUnit();
  }

  findAllDataCompleteTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataActiveTeen() {
    this._teenService
      .findAllDataActive()
      .subscribe((DataTeenBDActive: any) => {
        //console.log('Data Teen Active:', DataTeenBDActive);
        this.teenData = DataTeenBDActive;
        this.dataSource = new MatTableDataSource(this.teenData);
        this.dataSource.paginator = this.paginator;
      });

  }

  findAllDataCompleteOperativeUnit() {
    this._teenService
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
      });
  }

  getDataInformationOperativeUnit(id_operativeunit: number) {
    const soa = this.operativeUnitData.find(
      (item) => item.id_operativeunit === id_operativeunit
    );
    if (soa) {
      return `${soa.name}`;
    } else {
      return 'Unidad Operativa asignada no fue encontrada.';
    }
  }

}
