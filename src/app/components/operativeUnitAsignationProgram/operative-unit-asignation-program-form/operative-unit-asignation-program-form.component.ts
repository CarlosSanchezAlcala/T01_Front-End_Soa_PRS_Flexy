import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {OperativeUnitService} from "../../component-funcionality/services/operativeUnit/operative-unit.service";

@Component({
  selector: 'app-operative-unit-asignation-program-form',
  templateUrl: './operative-unit-asignation-program-form.component.html',
  styleUrls: ['./operative-unit-asignation-program-form.component.scss']
})
export class OperativeUnitAsignationProgramFormComponent implements OnInit, OnDestroy {

  asignationDataForm: FormGroup = new FormGroup({});
  funcionaryData: any[] = [];
  teenData: any[] = [];
  selectedTeenIDs: any[] = [];


  constructor(private router: Router,
              //public asignationService: unitprogramervice,
              private asignationDataFuncionaryService: OperativeUnitService,
              //private asignationDataTeenService: ProgramService,
              private fb: FormBuilder) {

    this.asignationDataForm = this.fb.group({
      id_funcionaryteend: [null],
      id_operativeunit: [''],
      id_program: new FormControl([]),
      status: ['A'],
      description: [''],
    });
    /*if (this.asignationService.transactionSelected) {
      this.asignationDataForm.patchValue(this.asignationService.transactionSelected);
    }*/
  }

  ngOnInit(): void {
    this.findAllDataFuncionaryRankLegalGuardian();
    this.findAllTeen();
    this.finAllDataTeenNoRegistered();
  }




  navigateToAsignationList() {
    this.router.navigate(['unitprogram']).then(() => {
      console.log('Se está redirigiendo a la lista de todas las asignaciones.')
    });
  }

  findAllFuncionary() {
    /*this.asignationDataFuncionaryService.findAllDataActive().subscribe((dataFuncionary: any) => {
      console.log('Datos obtenidos de Funcionario: ', dataFuncionary);
      //this.funcionaryData = dataFuncionary; => Datos completos de "Funcionario", sin filtrado de Tutor Legal.
    })*/
  }

  findAllDataFuncionaryRankLegalGuardian() {
    /*this.asignationDataFuncionaryService.findDataRankLegalGuardian().subscribe((dataLegalGuardianRank: any) => {
      console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank);
      this.funcionaryData = dataLegalGuardianRank;
    })*/
  }

  findAllTeen() {
    /*this.asignationDataTeenService.findAllDataActive().subscribe((dataTeen: any) => {
      this.teenData = dataTeen;
    })*/
  }


  finAllDataTeenNoRegistered() {
    /*this.asignationService.findDataTeenNoRegistered().subscribe((dataTeenNoRegistered: any) => {
      console.log('Los adolescente disponibles para el registro son: ', dataTeenNoRegistered);

      this.teenData = dataTeenNoRegistered;
    })*/
  }

  saveAsignation() {
    /*if (this.asignationService.transactionSelected) {
      // Actualizar || Modificar
      this.updateDataExistentAsignation();
    } else {
      // Registrar || Crear
      this.registerNewDataAsignation();
    }*/
  }

  registerNewDataAsignation() {
    /*const description = this.asignationDataForm.get('description')?.value;
    const idFuncionary = this.asignationDataForm.get('id_operativeunit')?.value;

    if (description) {
      // Obtén los IDs de los adolescentes seleccionados
      let selectedTeenIDs = this.asignationDataForm.get('id_program')?.value;
      // Verifica si "Seleccionar todo" está seleccionado
      if (selectedTeenIDs.includes('all')) {
        // Si "Seleccionar todo" está seleccionado, incluye todos los adolescentes
        selectedTeenIDs = this.teenData.map(teen => teen.id_program);
      }
      // Filtra la data original de adolescentes en base a las selecciones
      const selectedTeensData = this.teenData.filter((teen: any) => selectedTeenIDs.includes(teen.id_program));
      const dto = {
        description: description,
        id_operativeunit: idFuncionary,
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
    }*/
  }

  updateDataExistentAsignation() {
    /*console.log('Los datos a actualizar son: ', this.asignationDataForm.value);
    this.asignationService.updateDataAsignation(this.asignationDataForm.value).subscribe((dataUpdateAsignation) => {
      console.log('Los datos ingresados para actualizar son: ', dataUpdateAsignation);
      this.asignationDataForm.reset();
      this.navigateToAsignationList();
    })*/
  }

  selectAllOrDeselectAll() {
    const idTeenControl = this.asignationDataForm.get('id_program');

    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      const allTeenIDs = this.teenData.map(teen => teen.id_program);

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
    /*this.asignationService.transactionSelected = undefined;*/
  }

}
