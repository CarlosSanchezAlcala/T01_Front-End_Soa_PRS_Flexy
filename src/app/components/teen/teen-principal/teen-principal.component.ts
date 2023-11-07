import {Component, OnInit} from '@angular/core';
import {TeenService} from '../../component-funcionality/services/teen/teen.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuncionaryService} from '../../component-funcionality/services/funcionary/funcionary.service';
import {Asignation} from '../../component-funcionality/models/asignation/asignation.model';
import {AsignationService} from '../../component-funcionality/services/asignation/asignation.service';
import {MatDialog} from '@angular/material/dialog';
import {Teen} from "../../component-funcionality/models/teen/teen.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teen-principal',
  templateUrl: './teen-principal.component.html',
  styleUrls: ['./teen-principal.component.scss'],
})
export class TeenPrincipalComponent implements OnInit {
  teenData: any[] = [];
  showTransferForm = false;
  attorneyData: any[] = [];
  operativeUnitData: any[] = [];
  funcionaryData: any[] = [];
  teenDataForm: FormGroup = new FormGroup({});
  legalGuardianAsignationFrom: FormGroup = new FormGroup({});
  ubigeoData: any[] = [];
  idTeenNecesaryForRegisterAsignation: any[] = [];
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'operativeUnit',
    'email',
    'attorney',
    'actions',
  ];

  constructor(
    public _teenService: TeenService,
    public _funcionaryService: FuncionaryService,
    private _dialog: MatDialog,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllDataCompleteTeen();
    this.findAllDataActiveTeen();
    this.findAllDataCompleteOperativeUnit();
    this.findAllDataCompleteAttorney();
    this.findAllDataAttorney();
    this.findAllDataUbigeo();
    this.findAllDataFuncionaryRankLegalGuardian();
  }

  navigateToForm() {
    this._router.navigate(['teen-form']).then(() => {
      //console.log('Form');
    });
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
  }

  findAllDataFuncionaryRankLegalGuardian() {
    this._funcionaryService
      .findDataRankLegalGuardian()
      .subscribe((dataLegalGuardianRank: any) => {
        // console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank); --------- // Running successfully
        this.funcionaryData = dataLegalGuardianRank;
      });
  }

  findAllDataAttorney() {
    this._teenService
      .findAllDataAttorney()
      .subscribe((dataFindAttorney: any) => {
        // console.log('Data Attorney: ', dataFindAttorney); //--------- // Running successfully
        this.attorneyData = dataFindAttorney;
      });
  }

  findAllDataCompleteTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBD: any) => {
      //console.log('Data Teen:', DataTeenBD);
      // this.teenData = DataTeenBD;
    });
  }

  findAllDataUbigeo() {
    this._teenService
      .findAllDataUbigeoAddress()
      .subscribe((dataUbigeo: any) => {
        // console.log('Ubigeo Data: ', dataUbigeo); --------- // Running successfully
        this.ubigeoData = dataUbigeo;
      });
  }

  findAllDataActiveTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBDActive: any) => {
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

  updateDataTeen(teen: Teen) {
    this._teenService.teenSelected = teen;
    this.navigateToForm();
  }

  deleteDataTeen(teen: Teen) {
    this._teenService.deleteLogicalDataTeen(teen).subscribe((dataDeleteTeen: any) => {
      // console.log('Data Teen Delete: ', dataDeleteTeen); --------- // Running successfully
      this.findAllDataActiveTeen();
    });
  }

}
