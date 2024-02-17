import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {
  Transactional
} from "../../component-funcionality/models/transactionalAsignationProgram/transactionalAsignationProgram.model";
import {AsignationProgramFormComponent} from "../asignation-program-form/asignation-program-form.component";

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-asignation-program-principal',
  templateUrl: './asignation-program-principal.component.html',
  styleUrls: ['./asignation-program-principal.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class AsignationProgramPrincipalComponent implements OnInit {

  fechaDesde!: Date;
  fechaHasta!: Date;

  estadoFiltrado: string = "A";
  transaccionesFiltradas: Transactional[] = [];

  nuevaTransaccional: Transactional = new Transactional();
  registroSeleccionado: Transactional = new Transactional();
  showDataInactive = false;

  @ViewChild("actualizarDialog", { static: false })
  actualizarDialog!: TemplateRef<any>;

  constructor(
    //private _transaccionalService: AsignacionprogramsService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>

  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.findAllDataTransaccional();
    this.filtrarTransaccionesPorEstado();
    this.actualizarEstadoRegistros();

    setInterval(() => {
      console.log("si funca");
      this.actualizarEstadoRegistros();
    }, 30000);
  }

  filtrarPorFecha() {
    if (this.fechaDesde && this.fechaHasta) {
      this.transaccionesFiltradas = this.transaccionesFiltradas.filter(transaccion => {
        const fechaTransaccion = new Date(transaccion.date_asignation).getTime();
        return fechaTransaccion >= this.fechaDesde.getTime() && fechaTransaccion <= this.fechaHasta.getTime();
      });

    }

  }


  filtrarTransaccionesPorEstado() {

    /*this._transaccionalService.listarPorEstado(this.estadoFiltrado).subscribe(
      (res: Transactional[]) => {
        this.transaccionesFiltradas = res;
      },
      (error) => {
        console.error('Error al obtener las transacciones:', error);
      }
    );*/
  }


  cambiarEstado(estado: string) {
    this.estadoFiltrado = estado;
    this.filtrarTransaccionesPorEstado();
  }

  findAllDataTransaccional() {

    /*this._transaccionalService
      .listarPorEstado("A")
      .subscribe((res: any) => (this.transaccionesFiltradas = res));*/

  }

  findAllDataTransaccionalInactivo() {

    /*this._transaccionalService
      .listarPorEstado("I")
      .subscribe((res: any) => (this.transaccionesFiltradas = res));*/

  }

  navigateToForm() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AsignationProgramFormComponent, {
      width: "35%",
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.filtrarTransaccionesPorEstado();
    });
  }

  actualizarEstadoRegistros() {
    /*const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    this.transaccionesFiltradas.forEach((trans, index) => {
      const fechaTransaccion = new Date(trans.date_asignation);
      console.log(trans.active)
      if (trans.id !== undefined) {
        if (fechaTransaccion < hoy) {
          if (trans.active === "A") {
            trans.active = "I";
            console.log(trans.id)
            this._transaccionalService.actualizarRegistro(trans.id, trans).subscribe(
              (res: Transactional) => {
                console.log('Registro actualizado:', res);
                this.transaccionesFiltradas[index] = res;
                this.findAllDataTransaccional();
              },
              (error) => {
                console.error('Error al actualizar el registro:', error);
              }
            );
          }
        } else {
          if (trans.active === "I") {
            trans.active = "A";

            this._transaccionalService.actualizarRegistro(trans.id, trans).subscribe(
              (res: Transactional) => {
                console.log('Registro actualizado:', res);
                this.transaccionesFiltradas[index] = res;
                this.findAllDataTransaccional();
              },
              (error) => {
                console.error('Error al actualizar el registro:', error);
              }
            );
          }
        }
      } else {
        console.error('El ID del registro es undefined.');
      }
    });*/
  }




  actualizarRegistro(transaccional: Transactional) {
    this.registroSeleccionado = { ...transaccional };
    this.dialog.open(this.actualizarDialog);
  }

  cerrarDialogo() {
    this.dialog.closeAll();
  }

  guardarCambios() {
    /*const idRegistro = this.registroSeleccionado.id;
    this.registroSeleccionado.active = "A";
    if (idRegistro !== undefined) {
      this._transaccionalService.actualizarRegistro(idRegistro, this.registroSeleccionado).subscribe(
        (res: Transactional) => {
          this.cerrarDialogo();
          this.findAllDataTransaccional();
        })

    } else {
      console.error('Error al actualizar el registro:');
    }*/
  }

  restaurarRegistro(transaccional: Transactional) {
    /*if (transaccional.id !== undefined) {
      transaccional.active = "A"
      this._transaccionalService.actualizarRegistro(transaccional.id, transaccional).subscribe(
        (res: Transactional) => {
          console.log('Registro restaurado:', res);
          const index = this.transaccionesFiltradas.findIndex(item => item.id === res.id);
          this.transaccionesFiltradas[index] = res;
          this.findAllDataTransaccionalInactivo();
        },
        (error) => {
          console.error('Error al restaurar el registro:', error);
        }
      );
    } else {
      console.error('El ID del registro es undefined.');
    }*/
  }

  mostrarBotonRestaurar(estado: string) {
    return estado === 'I';
  }

  mostrarBotonActualizar(estado: string) {
    return estado === 'A';
  }

  generarPDF(): void {

    /*
    setTimeout(() => {
      this._transaccionalService.generarPDF()
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
    }, 3500);*/
  }

}
