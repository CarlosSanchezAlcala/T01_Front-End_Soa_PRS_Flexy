import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Entidades} from "../../component-funcionality/models/entidad/entidades.model";
import {MatDialog} from "@angular/material/dialog";
import {EntidadService} from "../../component-funcionality/services/entidad/entidad.service";
import {CooperatingEntitiesFormComponent} from "../cooperating-entities-form/cooperating-entities-form.component";

@Component({
  selector: 'app-cooperating-entities-principal',
  templateUrl: './cooperating-entities-principal.component.html',
  styleUrls: ['./cooperating-entities-principal.component.scss']
})
export class CooperatingEntitiesPrincipalComponent implements OnInit {

  dataSource: Entidades[] = [];
  estadoFiltrado: string = 'Todos';
  estadoActual: string = 'Activo';
  showDataInactive = false;

  @ViewChild("actualizarDialog", { static: false })
  actualizarDialog!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private entidadesService: EntidadService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.entidadesService
      .findAll()
      .subscribe((res) => (this.dataSource = res));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CooperatingEntitiesFormComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modal ha sido cerrada.');
      this.listar();
    });
  }

  editarEntidad(entidad: Entidades) {
    /*this.entidadesService.entidadSelected = entidad;
    this.openDialog();*/
  }

  deleteEntidad(id: string) {
    /*this.entidadesService.delete(id).subscribe((res) => {
      console.log('Se eliminó la entidad', res);
      this.listar();
    });*/
  }



  listar() {
    /*this.entidadesService.findAll().subscribe((res: Entidades[]) => {
      console.log(res);
      // Filtra el dataSource en función del estado seleccionado
      this.dataSource = this.estadoFiltrado === 'Todos'
        ? res
        : res.filter((entidad) => entidad.estado === this.estadoFiltrado);
    });*/
  }

  activarEntidad(id: string): void {
    /*this.entidadesService.activarEntidad(id).subscribe(() => {
      console.log('Entidad activada correctamente.');
      this.listar();
    });*/
  }


  generarPDF(): void {



    setTimeout(() => {
      this.entidadesService.generarPDF()
        .subscribe((response: ArrayBuffer) => {
          const file = new Blob([response], {type: 'application/pdf'});
          const url = URL.createObjectURL(file);
          const pdfWindow = window.open();
          if (pdfWindow) {
            pdfWindow.location.href = url;
          } else {
            alert('El navegador bloqueó la apertura de la ventana emergente. Por favor, asegúrate de desbloquear las ventanas emergentes para este sitio.');
          }
        });
    }, 3500);
  }

}
