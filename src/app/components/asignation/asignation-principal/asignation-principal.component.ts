import {Component, OnInit, ViewChild} from '@angular/core';
import { AsignationService } from '../../component-funcionality/services/asignation/asignation.service';
import { Router } from '@angular/router';
import { Asignation } from '../../component-funcionality/models/asignation/asignation.model';
import { transactionDataCompleteResponse } from '../../component-funcionality/models/asignation/transactionDataComplete.model';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-asignation-principal',
  templateUrl: './asignation-principal.component.html',
  styleUrls: ['./asignation-principal.component.scss']
})
export class AsignationPrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  asignationData: any[] = [];
  withOutBodyAsignation: any[] = [];
  funcionaryColumns: string[] =
    ['dataFuncionary',
      'dniFuncionary',
      'dataTeen',
      'dniTeen',
      'descripcionAsignacion',
      'actions'];

  dataSource = new MatTableDataSource(this.asignationData);

  constructor(private asignationService: AsignationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllDataActive();
    this.findAllDataWithoutBody();
  }

  navigateToForm() {
    this.router.navigate(['asignation-form']).then(() => {
      //console.log('Se está redirigiendo al formulario de registro.')
    })
  }

  findAllDataWithoutBody() {
    this.asignationService.findAllDatosWithoutBody().subscribe((dataAllWithoutBody: any) => {
      //console.log('Datos encontrados sin cuerpo de relleno son: ', dataAllWithoutBody);
      this.withOutBodyAsignation = dataAllWithoutBody;
    })
  }

  findAllDataAsignation() {
    this.asignationService.findAll().subscribe((dataAsignation: any) => {
      //console.log('Datos de la asignación: ', dataAsignation);
      //this.asignationData = dataAsignation; => No hace el filtrado por datos activos.
    })
  }

  findAllDataActive() {
    this.asignationService.findAllDataActive().subscribe((dataAsignationActive: any) => {
      //console.log('Datos de la asignación en modo Activo: ', dataAsignationActive);
      this.asignationData = dataAsignationActive;
      this.dataSource = new MatTableDataSource(this.asignationData);
      this.dataSource.paginator = this.paginator;
    })
  }

  updateDataAsignation(asignation: Asignation) {
    this.asignationService.asignationSelected = asignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  updateTwoWayDataAsignation(twoWayAsignation: transactionDataCompleteResponse) {
    this.asignationService.transactionSelected = twoWayAsignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  deleteLogical(asignation: Asignation) {
    this.asignationService.deleteLogicalDataAsignation(asignation).subscribe((dataDeleteLogical) => {
      console.log('Se esta eliminando el dato de: ', dataDeleteLogical);
      this.findAllDataActive();
    })
  }

  deleteDataCompleteAsignation(asignation: Asignation) {
    this.asignationService.deleteDataAsignationComplete(asignation).subscribe((dataDeleteCompleteAsignation) => {
      console.log('El dato eliminado es: ', dataDeleteCompleteAsignation);
      this.findAllDataActive();
    })
  }

}
