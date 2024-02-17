import {Component, OnInit} from '@angular/core';
import {Entidades} from "../../component-funcionality/models/entidad/entidades.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

interface FoodWithLink {
  value: string;
  viewValue: string;
  link: string;
}

@Component({
  selector: 'app-notifications-form',
  templateUrl: './notifications-form.component.html',
  styleUrls: ['./notifications-form.component.scss']
})
export class NotificationsFormComponent implements OnInit {

  actionsWithLinks: FoodWithLink[] = [
    { value: 'Informe de incumplimiento', viewValue: 'Informe de incumplimiento', link: 'https://docs.google.com/forms/d/e/1FAIpQLScP_1MpoNeWD8w6JBbce7YgEiZBzClZ_6pJeji7ppEEp6aYAw/viewform?embedded=true' },
    { value: 'Informe de seguimiento', viewValue: 'Informe de seguimiento', link: 'https://docs.google.com/forms/d/e/1FAIpQLSf1WuD72Z-Vl0cJEnSqTi8-zfwCYlPZnMCwGZJXY1seuSjqig/viewform?embedded=true' },
    { value: 'Informe de Incidencia', viewValue: 'Informe de Incidencia', link: 'https://docs.google.com/forms/d/e/1FAIpQLSeqhEpkqnsMpiu_vwGg4LVHYc7xjNh8v7U4YKUxtdVnj7A3fg/viewform?embedded=true' },
    { value: 'Informe final', viewValue: 'Informe final', link: 'https://docs.google.com/forms/d/e/1FAIpQLSfzhZkZM0lQ6M7Wd7Rj-0Jmm964SDGuMpEPkib2l0Wbin_2lQ/viewform?embedded=true' },
  ];

  selectedOption: string = this.actionsWithLinks[0].link;

  idfuncionario: number | undefined;
  identidad: number | undefined;
  fecha: Date | any;
  accionSeleccionada: string | undefined;
  entidades: Entidades[] = [];
  funcionarios: [] | any;
  isLinear = true;

  constructor(//private apiService: NotificacionService,
              public dialogRef: MatDialogRef<NotificationsFormComponent>,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.cargarEntidades();
    this.cargarFuncionario();
    this.getSelectedLink();
  }
  onClose(): void {
    this.dialogRef.close();
    this.cargarEntidades();
  }

  getLinkForSelectedAction(): string | undefined {
    return this.actionsWithLinks.find(action => action.value === this.accionSeleccionada)?.link;
  }


  onSave() {
    /*const formData = {
      id_funcionary: this.idfuncionario,
      id_entities: this.identidad,
      description: this.accionSeleccionada,
      date_notification: this.formatDate(this.fecha),
      url: this.getLinkForSelectedAction(),
      active: "A"
    };

    this.apiService.createNotification(formData).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro completado con éxito',
          showConfirmButton: false,
          timer: 3000, // Duración más larga para una sensación más elegante
          toast: true, // Usa el modo "toast"
          background: '#40c2d3', // Color de fondo personalizado
          color: '#ffffff', // Texto en color blanco para contraste
          customClass: {
            popup: 'custom-toast' // Clase personalizada para estilos adicionales
          }
        });

        this.onNoClick();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al crear la notificación:', error);
      }
    );*/
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day}`;
  }


  abrirEnlace() { }


  cargarEntidades() {
    /*this.apiService.findAllentidad().subscribe(
      (data) => {
        this.entidades = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )*/
  }
  cargarFuncionario() {
    /*this.apiService.obtenerDatos().subscribe(
      (data) => {
        this.funcionarios = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )*/
  }

  getSelectedLink(): SafeResourceUrl {
    const selectedAction = this.actionsWithLinks.find(action => action.value === this.accionSeleccionada);
    const url = selectedAction ? selectedAction.link : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
