import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NotificationsFormComponent} from "../notifications-form/notifications-form.component";

@Component({
  selector: 'app-notifications-principal',
  templateUrl: './notifications-principal.component.html',
  styleUrls: ['./notifications-principal.component.scss']
})
export class NotificationsPrincipalComponent implements OnInit {

  data: any;

  selectedDate: Date | null = null;
  selectedEntidad: number | null = null;
  selectedEntityFilter: number | null = null;
  selectedFuncionarioFilter: string | null = null;
  entidades: any[] = [];
  funcionarios: any[] = [];


  @ViewChild("actualizarDialog", { static: false })
  actualizarDialog!: TemplateRef<any>;

  constructor(
    //private apiService: NotificacionService,
    public dialog: MatDialog,
    //private NotificacionesService: NotificacionService
    ){}

  ngOnInit(): void {
    this.findAll();
    this.listar();
    this.cargarEntidades();
    this.cargarFuncionarios();
    this.selectedEntidad = null;
    this.applyEntityFilter();
    this.applyFuncionarioFilter();
  }

  listar() {
    /*this.apiService.getData().subscribe(
      (response: any) => {
        this.data = response.map((item: any) => {
          const fechaISO8601 = item.date_notification;
          const fecha = new Date(fechaISO8601);
          const fechaFormateada = fecha.toLocaleDateString('es-ES'); // Configuración regional para español
          item.date_notification = fecha;
          return item;
        });
        this.applyDateFilter();
        this.applyEntityFilter();
        this.applyFuncionarioFilter();
      }
    );*/
  }



  applyDateFilter() {
    if (this.selectedDate && this.data) {
      this.data = this.data.filter((item: any) => {
        const fechaItem = new Date(item.date_notification);
        return fechaItem.setHours(0, 0, 0, 0) === this.selectedDate?.setHours(0, 0, 0, 0);
      });
    }
  }

  applyEntityFilter() {
    console.log('ID de Entidad Seleccionada:', this.selectedEntityFilter);

    if (this.selectedEntityFilter !== null && this.data) {
      this.data = this.data.filter((item: any) => {
        console.log('ID de Entidad en el Elemento:', item.id_entities);
        return item.id_entity === this.selectedEntityFilter;
      });

      console.log('Datos después del filtro:', this.data);
    }
  }

  applyFuncionarioFilter() {
    if (this.selectedFuncionarioFilter !== null && this.data) {
      this.data = this.data.filter((item: any) => {
        return item.id_funcionary === this.selectedFuncionarioFilter;
      });
    }
  }



  clearDateFilter() {
    this.selectedDate = null;
    this.selectedEntityFilter = null;
    this.selectedFuncionarioFilter = null;
    this.listar();
  }

  cargarEntidades() {
    /*this.NotificacionesService.findAllentidad().subscribe(
      (data) => {
        this.entidades = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )*/
  }

  cargarFuncionarios() {
    /*this.NotificacionesService.findAll().subscribe(
      (data) => {
        this.funcionarios = data;
        console.log('Entidades cargadas con éxito:', data);
      },
      (error) => {
        console.error('Error al cargar las entidades', error);
      }
    )*/
  }



  findAll() {


  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationsFormComponent, {
      width: '35%', // Ancho de la modal
      // Otras opciones de configuración de la modal si las necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modal ha sido cerrada.');
      this.listar();
    });
  }



  generarPDF() {
    /*this.NotificacionesService.generarPDFFuncionary().subscribe((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      const pdfWindow = window.open();
      if (pdfWindow) {
        pdfWindow.location.href = url;
      } else {
        alert('El navegador bloqueó la apertura de la ventana emergente. Por favor, asegúrate de desbloquear las ventanas emergentes para este sitio.');
      }
    })*/
  }

}
