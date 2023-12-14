import {Component, OnInit, ViewChild} from '@angular/core';
import {AsignationService} from '../../component-funcionality/services/asignation/asignation.service';
import {Router} from '@angular/router';
import {Asignation} from '../../component-funcionality/models/asignation/asignation.model';
import {
  TransactionalAllocation,
  transactionDataCompleteResponse
} from '../../component-funcionality/models/asignation/transactionDataComplete.model';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { SafeResourceUrl } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-asignation-principal',
  templateUrl: './asignation-principal.component.html',
  styleUrls: ['./asignation-principal.component.scss']
})
export class AsignationPrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showFirstLastButtons: boolean = true;
  asignationData: any[] = [];
  showDataInactive = false;
  pdfSrc: SafeResourceUrl | null = null;
  withOutBodyAsignation: any[] = [];
  funcionaryColumns: string[] =
    ['dataFuncionary',
      'dniFuncionary',
      'dataTeen',
      'dniTeen',
      'descripcionAsignacion',
      'iniciodeFunción',
      'actions'];

  dataSource = new MatTableDataSource(this.asignationData);

  constructor(private asignationService: AsignationService,
              private router: Router, private toastServices: HotToastService,) {
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

  updateTwoWayDataAsignation(twoWayAsignation: TransactionalAllocation) {
    console.log('El dato de la asignación es: ', twoWayAsignation);
    this.asignationService.transactionSelected = twoWayAsignation;
    this.navigateToForm();
    this.findAllDataAsignation();
  }

  /*deleteLogical(asignation: Asignation) {
    this.asignationService.deleteLogicalDataAsignation(asignation).subscribe((dataDeleteLogical) => {
      console.log('Se esta eliminando el dato de: ', dataDeleteLogical);
      this.findAllDataActive();
    })
  }*/

  deleteDataCompleteAsignation(asignation: Asignation) {
    this.asignationService.deleteDataAsignationComplete(asignation).subscribe((dataDeleteCompleteAsignation) => {
      console.log('El dato eliminado es: ', dataDeleteCompleteAsignation);
      this.findAllDataActive();
    })
  }

  generarPDF(): void {
    this.toastServices.success('Generando PDF...', {
      duration: 3000,
    });

    setTimeout(() => {
      this.asignationService
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
