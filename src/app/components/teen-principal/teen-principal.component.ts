import { Component, OnInit } from '@angular/core';
import { TeenService } from '../component-funcionality/services/teen/teen.service';

@Component({
  selector: 'app-teen-principal',
  templateUrl: './teen-principal.component.html',
  styleUrls: ['./teen-principal.component.scss'],
})
export class TeenPrincipalComponent implements OnInit {
  teenData: any[] = [];
  attorneyData: any[] = [];
  operativeUnitData: any[] = [];
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'operativeUnit',
    'email',
    'attorney',
  ];

  constructor(public _teenService: TeenService) {}

  ngOnInit(): void {
    this.findAllDataCompleteTeen();
    this.findAllDataActiveTeen();
    this.findAllDataCompleteOperativeUnit();
    this.findAllDataCompleteAttorney();
  }

  findAllDataCompleteTeen() {
    this._teenService.findAllDataTeen().subscribe((DataTeenBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataActiveTeen() {
    this._teenService
      .finAllDataTeenActive()
      .subscribe((DataTeenBDActive: any) => {
        //console.log('Data Teen Active:', DataTeenBDActive);
        this.teenData = DataTeenBDActive;
      });
  }

  findAllDataCompleteOperativeUnit() {
    this._teenService
      .findAllDataOperativeUnit()
      .subscribe((dataOperativeUnit: any) => {
        this.operativeUnitData = dataOperativeUnit;
      });
  }

  findAllDataCompleteAttorney() {
    this._teenService.findAllDataAttorney().subscribe((dataAttorney: any) => {
      this.attorneyData = dataAttorney;
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

  getDataInformationAttorney(id_attorney: number) {
    const attorney = this.attorneyData.find(
      (item) => item.id_attorney === id_attorney
    );
    if (attorney) {
      return `${attorney.name} ${attorney.surnameFather} ${attorney.surnameMother}`;
    } else {
      return 'Apoderado asignado no fue encontrado.';
    }
  }
}
