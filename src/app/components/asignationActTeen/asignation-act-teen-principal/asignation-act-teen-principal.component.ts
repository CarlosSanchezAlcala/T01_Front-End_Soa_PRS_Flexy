import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AsignationActTeen} from "../../component-funcionality/models/asignationActTeen/asignationActTeen.model";

@Component({
  selector: 'app-asignation-act-teen-principal',
  templateUrl: './asignation-act-teen-principal.component.html',
  styleUrls: ['./asignation-act-teen-principal.component.scss']
})
export class AsignationActTeenPrincipalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentFilterValue: string = '';
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
  filterControl = new FormControl('');
  dataTransaccional: any;
  constructor(//private unitprogramService: AsignationActTeenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllDataActive();
    this.findAllDataWithoutBody();
    if (this.filterControl) {
      this.filterControl.valueChanges.subscribe(() => {
        this.applyFilter();
      });
    }
  }

  applyFilter() {
    const filterValue = this.filterControl?.value?.toLowerCase() || '';
    this.currentFilterValue = filterValue; // Actualiza el valor actual del filtro

    // Filtra los datos basados en el nombre completo del adolescente y el número de documento
    const filteredData = this.asignationData.filter(dataTransaccional => {
      const fullName = `${dataTransaccional.teenResponseDto.father_last_name} ${dataTransaccional.teenResponseDto.mother_last_name}, ${dataTransaccional.teenResponseDto.name}`;
      const documentNumber = dataTransaccional.teenResponseDto.document_number || '';
      return fullName.toLowerCase().includes(filterValue) || documentNumber.toLowerCase().includes(filterValue);
    });

    // Asigna los datos filtrados al dataSource
    this.dataSource.data = filteredData;
  }
  viewReportWithFilter(): void {
    // Utiliza el valor actual del filtro al hacer clic en el botón de informe
    this.viewReport(this.currentFilterValue);
  }







  navigateToForm() {
    this.router.navigate(['asignationActTeenForm']).then(() => {
      //console.log('Se está redirigiendo al formulario de registro.')
    })
  }

  findAllDataWithoutBody() {
    /*this.unitprogramService.findAllDatosWithoutBody().subscribe((dataAllWithoutBody: any) => {
      console.log('Datos encontrados sin cuerpo de relleno son: ', dataAllWithoutBody);
      this.withOutBodyAsignation = dataAllWithoutBody;
    })*/
  }

  findAllDataAsignation() {
    /*this.unitprogramService.findAll().subscribe((dataAsignation: any) => {
      console.log('Datos de la asignación: ', dataAsignation);
      //this.asignationData = dataAsignation; => No hace el filtrado por datos activos.
    })*/
  }

  findAllDataActive() {
    /*this.unitprogramService.findAllDataActive().subscribe((dataAsignationActive: any) => {
      console.log('Datos de la asignación en modo Activo: ', dataAsignationActive);
      this.asignationData = dataAsignationActive;
      this.dataSource = new MatTableDataSource(this.asignationData);
      this.dataSource.paginator = this.paginator;
    })*/
  }

  viewReport(dniteen: string): void {
    /*this.unitprogramService.exportAsignationReport(dniteen).subscribe(
      (data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Abre el informe en una nueva ventana o pestaña
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error al ver el informe', error);
      }
    );*/
  }



  /*viewReport(dniteen: string): void {
    this.unitprogramService.exportAsignationReport(dniteen).subscribe(
      (data: any) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Abre el informe en una nueva ventana o pestaña
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error al ver el informe', error);
      }
    );
  }*/

  updateDataAsignation(asignation: AsignationActTeen) {
    /*this.unitprogramService.asignationSelected = asignation;
    this.navigateToForm();
    this.findAllDataAsignation();*/
  }

  updateTwoWayDataAsignation(twoWayAsignation: AsignationActTeen) {
    /*this.unitprogramService.transactionSelected = twoWayAsignation;
    this.navigateToForm();
    this.findAllDataAsignation();*/
  }

  deleteLogical(asignation: AsignationActTeen) {
    /*this.unitprogramService.deleteLogicalDataAsignation(asignation).subscribe((dataDeleteLogical) => {
      console.log('Se esta eliminando el dato de: ', dataDeleteLogical);
      this.findAllDataActive();
    })*/
  }

  deleteDataCompleteAsignation(asignation: AsignationActTeen) {
    /*this.unitprogramService.deleteDataAsignationComplete(asignation).subscribe((dataDeleteCompleteAsignation) => {
      console.log('El dato eliminado es: ',   dataDeleteCompleteAsignation);
      this.findAllDataActive();
    })*/
  }

}
