import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import Swal from 'sweetalert2';
import {EntidadService} from "../../component-funcionality/services/entidad/entidad.service";

@Component({
  selector: 'app-cooperating-entities-form',
  templateUrl: './cooperating-entities-form.component.html',
  styleUrls: ['./cooperating-entities-form.component.scss']
})
export class CooperatingEntitiesFormComponent implements OnInit {

  entidadesForm: FormGroup = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<CooperatingEntitiesFormComponent>,
              private fb: FormBuilder,
              public entidadesService: EntidadService) { }

  ngOnInit(): void {
    this.initEntidadesForm();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  initEntidadesForm() {
    this.entidadesForm = this.fb.group({
      id: [null],
      nombre: ['',[Validators.required]],
      ruc: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      contacto: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      direccion: ['',[Validators.required]],
      estado: ['A'],
    });

    if (this.entidadesService.entidadSelected) {
      this.entidadesForm.patchValue(this.entidadesService.entidadSelected);
    }
  }

  saveEntidades() {
    if (this.entidadesService.entidadSelected) {
      this.updateEntidad();
    } else {
      this.createEntidades();
    }
  }

  createEntidades() {
    console.log('Datos de Entidades Cooperantes:', this.entidadesForm.value)
    this.entidadesService.create(this.entidadesForm.value).subscribe(res => {
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

      console.log('Se guardo correctamente:', res);
      this.entidadesForm.reset();
      this.onClose();
    })
  }

  updateEntidad() {
    console.log('Datos de Entidades Cooperantes:', this.entidadesForm.value)
    this.entidadesService.update(this.entidadesForm.value).subscribe(res => {
      console.log('Se actualizó correctamente', res);
      this.entidadesForm.reset();
      this.onClose();
    })
  }

  ngOnDestroy() {
    this.entidadesService.entidadSelected = undefined;
  }
}
