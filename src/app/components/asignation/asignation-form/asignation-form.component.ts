import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AsignationService } from '../../component-funcionality/services/asignation/asignation.service';
import { FuncionaryService } from '../../component-funcionality/services/funcionary/funcionary.service';
import { TeenService } from '../../component-funcionality/services/teen/teen.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asignation-form',
  templateUrl: './asignation-form.component.html',
  styleUrls: ['./asignation-form.component.scss']
})
export class AsignationFormComponent implements OnInit, OnDestroy {

  asignationDataForm: FormGroup = new FormGroup({});
  funcionaryData: any[] = [];
  teenData: any[] = [];
  selectedTeenIDs: any[] = [];


  constructor(private router: Router,
              public asignationService: AsignationService,
              private asignationDataFuncionaryService: FuncionaryService,
              private asignationDataTeenService: TeenService,
              private fb: FormBuilder) {

    this.asignationDataForm = this.fb.group({
      id_funcionaryteend: [null],
      id_funcionary: [''],
      id_teen: new FormControl([]),
      status: ['A'],
      description: [''],
    });

    if (this.asignationService.transactionSelected) {
      this.asignationDataForm.patchValue(this.asignationService.transactionSelected);
    }
  }

  ngOnInit(): void {
    this.findAllDataFuncionaryRankLegalGuardian();
    this.findAllTeen();
    this.finAllDataTeenNoRegistered();
  }




  navigateToAsignationList() {
    this.router.navigate(['asignation-list']).then(() => {
      // console.log('Se está redirigiendo a la lista de todas las asignaciones.')
    });
  }

  findAllFuncionary() {
    this.asignationDataFuncionaryService.findAllDataActive().subscribe((dataFuncionary: any) => {
      // console.log('Datos obtenidos de Funcionario: ', dataFuncionary);
      //this.funcionaryData = dataFuncionary; => Datos completos de "Funcionario", sin filtrado de Tutor Legal.
    })
  }

  findAllDataFuncionaryRankLegalGuardian() {
    this.asignationDataFuncionaryService.findDataRankLegalGuardian().subscribe((dataLegalGuardianRank: any) => {
      //console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank);
      this.funcionaryData = dataLegalGuardianRank;
    })
  }

  findAllTeen() {
    this.asignationDataTeenService.findAllDataActive().subscribe((dataTeen: any) => {
      this.teenData = dataTeen;
    })
  }
  finAllDataTeenNoRegistered() {
    this.asignationService.findDataTeenNoRegistered().subscribe((dataTeenNoRegistered: any) => {
      //console.log('Los adolescente disponibles para el registro son: ', dataTeenNoRegistered);
      this.teenData = dataTeenNoRegistered;
    })
  }

  saveAsignation() {
    if (this.asignationService.transactionSelected) {
      // Actualizar || Modificar
      this.updateDataExistentAsignation();
    } else {
      // Registrar || Crear
      this.registerNewDataAsignation();
    }
  }

  registerNewDataAsignation() {
    const description = this.asignationDataForm.get('description')?.value;
    const idFuncionary = this.asignationDataForm.get('id_funcionary')?.value;

    if (description && idFuncionary) {
      // Obtén los IDs de los adolescentes seleccionados
      let selectedTeenIDs = this.asignationDataForm.get('id_teen')?.value;
      // Verifica si "Seleccionar todo" está seleccionado
      if (selectedTeenIDs.includes('all')) {
        // Si "Seleccionar todo" está seleccionado, incluye todos los adolescentes
        selectedTeenIDs = this.teenData.map(teen => teen.id_teen);
      }
      // Filtra la data original de adolescentes en base a las selecciones
      const selectedTeensData = this.teenData.filter((teen: any) => selectedTeenIDs.includes(teen.id_teen));
      const dto = {
        description: description,
        id_funcionary: idFuncionary,
        teens: selectedTeensData
      };
      // Llama al método savebulk en tu servicio
      this.asignationService.saveMasive(dto).subscribe(
        () => {
          // Éxito, hacer algo si es necesario
          this.asignationDataForm.reset();
          this.navigateToAsignationList();
        },
        error => {
          console.error("Error al guardar datos: ", error);
        }
      );
    } else {
      console.error("Los datos del formulario son nulos o faltantes.");
    }
  }

  updateDataExistentAsignation() {
    console.log('Los datos a actualizar son: ', this.asignationDataForm.value);
    this.asignationService.updateDataAsignation(this.asignationDataForm.value).subscribe((dataUpdateAsignation) => {
      console.log('Los datos ingresados para actualizar son: ', dataUpdateAsignation);
      this.asignationDataForm.reset();
      this.navigateToAsignationList();
    })
  }

  selectAllOrDeselectAll() {
    const idTeenControl = this.asignationDataForm.get('id_teen');

    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      const allTeenIDs = this.teenData.map(teen => teen.id_teen);

      if (this.isAllSelected()) {
        // Si el checkbox está marcado, deselecciona todos los adolescentes
        idTeenControl.patchValue([]);
      } else {
        // Si el checkbox no está marcado, selecciona todos los adolescentes
        idTeenControl.patchValue(allTeenIDs);
      }
    }
  }

  isAllSelected(): boolean {
    const idTeenControl = this.asignationDataForm.get('id_teen');
    const allTeenIDs = this.teenData.map(teen => teen.id_teen);
    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      return JSON.stringify(idTeenControl.value) === JSON.stringify(allTeenIDs);
    }
    return false;  // Devuelve false en caso de que idTeenControl sea nulo
  }


  ngOnDestroy(): void {
    this.asignationService.transactionSelected = undefined;
  }

}
