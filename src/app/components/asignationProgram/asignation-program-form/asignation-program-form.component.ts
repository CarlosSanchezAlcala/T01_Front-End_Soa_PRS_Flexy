import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  Transactional
} from "../../component-funcionality/models/transactionalAsignationProgram/transactionalAsignationProgram.model";
import {Programa, PROGRAMAS} from "../../component-funcionality/models/programs/programs";
import {Actividad} from "../../component-funcionality/models/activities/actividades";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-asignation-program-form',
  templateUrl: './asignation-program-form.component.html',
  styleUrls: ['./asignation-program-form.component.scss']
})
export class AsignationProgramFormComponent implements OnInit {

  registroForm!: FormGroup;
  programas: Programa[] = PROGRAMAS;
  actividades: Actividad[] = [];
  registroError: boolean = false;
  registrosTemporales: Transactional[] = [];
  isFormEmpty: boolean = true;

  constructor(
   //private transaccionalService: AsignacionprogramsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AsignationProgramFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {
    this.registroForm = this.fb.group({
      id_programs: [null, Validators.required],
      id_activities: [null, Validators.required],
      date_asignation: [null, Validators.required],
      direction: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initAsignationForm();
    this.checkFormEmpty();
    this.findAllActividad();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  checkFormEmpty() {
    this.isFormEmpty = Object.values(this.registroForm.value).every(value => !value);
  }

  findAllActividad() {
    /*this.transaccionalService
      .listaactividaes()
      .subscribe((res: any) => {
          this.actividades = res;
        }
      )*/
  }


  registrarTransaccional() {
    /*this.spinner.show();

    const dialogRef = this.dialog.open(DialogComponentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const data = this.registroForm.getRawValue();

      const transformedData = {
        id_programs: data.id_programs,
        activities: data.id_activities.map((id: any) => ({ id_activities: id })),
        date_asignation: data.date_asignation,
        direction: data.direction
      };
      this.transaccionalService.registrar(transformedData).subscribe(
        () => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro completado con éxito',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            background: '#40c2d3',
            color: '#ffffff',
            customClass: {
              popup: 'custom-toast'
            }
          });
          this.registroForm.reset();
          this.onNoClick();
          this.spinner.hide();
        },

        (error) => {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al realizar el registro',
            showConfirmButton: false,
            timer: 1500
          });
          console.error('Error en la asignación', error);
          this.registroError = true;
          this.spinner.hide();
        }
      );

    });*/
  }

  selectAllOrDeselectAll() {
    /*const idTeenControl = this.registroForm.get('id_activities');

    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      const allTeenIDs = this.actividades.map(teen => teen.id);

      if (this.isAllSelected()) {
        // Si el checkbox está marcado, deselecciona todos los adolescentes
        idTeenControl.patchValue([]);
      } else {
        // Si el checkbox no está marcado, selecciona todos los adolescentes
        idTeenControl.patchValue(allTeenIDs);
      }
    }*/
  }

  isAllSelected(): boolean {
    const idTeenControl = this.registroForm.get('id_activities');
    const allTeenIDs = this.actividades.map(teen => teen.id);
    if (idTeenControl) {
      return JSON.stringify(idTeenControl.value) === JSON.stringify(allTeenIDs);
    }
    return false;
  }


  initAsignationForm() {
    this.registroForm = this.fb.group({
      id: [null],
      id_programs: ["", Validators.required],
      id_activities: [[], Validators.required],
      date_asignation: ["", Validators.required],
      direction: ["", Validators.required],
      name_programs: ["", Validators.required],
      name_activities: ["", Validators.required],
      active: ["A"],
    });
    /*if (this.transaccionalService.asignationSelected) {
      this.registroForm.patchValue(
        this.transaccionalService.asignationSelected
      );
    }*/
  }

  ngOnDestroy(): void {
    /*this.transaccionalService.asignationSelected = undefined;*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
