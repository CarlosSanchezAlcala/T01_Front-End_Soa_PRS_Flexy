import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TeenService} from '../../component-funcionality/services/teen/teen.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FuncionaryService} from '../../component-funcionality/services/funcionary/funcionary.service';
import {Asignation} from '../../component-funcionality/models/asignation/asignation.model';
import {AsignationService} from '../../component-funcionality/services/asignation/asignation.service';
import {MatDialog} from '@angular/material/dialog';
import {Teen} from "../../component-funcionality/models/teen/teen.model";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teen-principal',
  templateUrl: './teen-principal.component.html',
  styleUrls: ['./teen-principal.component.scss'],
})
export class TeenPrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  teenData: any[] = [];
  showTransferForm = false;
  attorneyData: any[] = [];
  operativeUnitData: any[] = [];
  funcionaryData: any[] = [];
  ubigeoData: any[] = [];
  selectedTeen: any;
  showDetails = false;
  displayedColumns: string[] = [
    'dni',
    'name',
    'surnames',
    'phoneNumber',
    'operativeUnit',
    'email',
    'attorney',
    'actions',
    'details'
  ];

  // Manejar el paginator de la tabla (Teen)
  dataSource = new MatTableDataSource(this.teenData);

  constructor(
    public _teenService: TeenService,
    public _funcionaryService: FuncionaryService,
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

  showFuncionarioDetails(funcionario: any) {
    this.selectedTeen = funcionario;
    this.showDetails = true;
  }

  closeDetails() {
    this.selectedTeen = null;
    this.showDetails = false;
  }

  showForm() {
    this.showTransferForm = true;
  }

  hideForm() {
    this.showTransferForm = false;
  }

  getCompleteConfirmation(confirmation: string): string {
    return confirmation === 'M' ? 'Masculino' : 'Femenino';
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

  getDataCompleteUbigeoBD(codubi: string) {
    const ubigeo = this.ubigeoData.find((item) => item.codubi === codubi);
    if (ubigeo) {
      return `${ubigeo.depar} - ${ubigeo.provi} - ${ubigeo.distri}`;
    } else {
      return 'Ubigeo no encontrado.';
    }
  }

  findAllDataActiveTeen() {
    this._teenService.findAllDataActive().subscribe((DataTeenBDActive: any) => {
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

  findAllDataCompleteAttorney() {
    this._teenService.findAllDataAttorney().subscribe((dataAttorney: any) => {
      this.attorneyData = dataAttorney;
    });
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
    this.findAllDataActiveTeen();
  }

  deleteDataTeen(teen: Teen) {
    this._teenService.deleteLogicalDataTeen(teen).subscribe((dataDeleteTeen: any) => {
      // console.log('Data Teen Delete: ', dataDeleteTeen); --------- // Running successfully
      this.findAllDataActiveTeen();
    });
  }
}
