import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TeenService} from "../../component-funcionality/services/teen/teen.service";
import {ActivitiesService} from "../../component-funcionality/services/activities/activities.service";

@Component({
  selector: 'app-asignation-act-teen-form',
  templateUrl: './asignation-act-teen-form.component.html',
  styleUrls: ['./asignation-act-teen-form.component.scss']
})
export class AsignationActTeenFormComponent {

  asignationDataForm: FormGroup = new FormGroup({});
  funcionaryData: any[] = [];
  teenData: any[] = [];
  selectedTeenIDs: any[] = [];
  events: string[] = [];
  monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  selectedDate: Date | null = null;

  addEvent(type: string) {
    if (this.selectedDate) {
      const day = this.selectedDate.getDate();
      const monthIndex = this.selectedDate.getMonth();
      const year = this.selectedDate.getFullYear() % 100;

      const formattedDate = `${day}-${this.monthNames[monthIndex]}-${year}`;

      this.events.push(`${type}: ${formattedDate}`);
    }
  }

  // Función para analizar la fecha en el formato personalizado
  parseDate(dateString: string): Date | null {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const monthIndex = this.monthNames.findIndex(month => month.toLowerCase() === dateParts[1].toLowerCase());
      const year = 2000 + parseInt(dateParts[2], 10); // Asumiendo que los años son 20YY

      if (!isNaN(day) && !isNaN(monthIndex) && !isNaN(year)) {
        return new Date(year, monthIndex, day);
      }
    }
    return null;
  }

  constructor(private router: Router,
              //public asignationService: AsignationActTeenService,
              private asignationDataFuncionaryService: ActivitiesService,
              private asignationDataTeenService: TeenService,
              private fb: FormBuilder) {

    this.asignationDataForm = this.fb.group({
      start_date: ['2023-12-26'],
      participation_status: ['Completada'],
      active: ['A'],
      id_activities: [''],
      duration: '',
      notes: '',
      id_teenager: new FormControl([
      ]),

    });

    /*if (this.asignationService.transactionSelected) {
      this.asignationDataForm.patchValue(this.asignationService.transactionSelected);
    }*/
  }

  ngOnInit(): void {
    this.findAllDataFuncionaryRankLegalGuardian();
    this.findAllTeen();
    //this.finAllDataTeenNoRegistered();
  }




  navigateToAsignationList() {
    this.router.navigate(['asignationActTeen-list']).then(() => {
      console.log('Se está redirigiendo a la lista de todas las asignaciones.')
    });
  }

  findAllFuncionary() {
    this.asignationDataFuncionaryService.findAllDataActive().subscribe((dataFuncionary: any) => {
      console.log('Datos obtenidos de Funcionario: ', dataFuncionary);
      //this.funcionaryData = dataFuncionary; => Datos completos de "Funcionario", sin filtrado de Tutor Legal.
    })
  }

  findAllDataFuncionaryRankLegalGuardian() {
    /*this.asignationDataFuncionaryService.findDataRankLegalGuardian().subscribe((dataLegalGuardianRank: any) => {
      console.log('Funcionarios con rank de Tutor Legal: ', dataLegalGuardianRank);
      this.funcionaryData = dataLegalGuardianRank;
    })*/
  }

  findAllTeen() {
    this.asignationDataTeenService.findAllDataActive().subscribe((dataTeen: any) => {
      this.teenData = dataTeen;
    })
  }


  finAllDataTeenNoRegistered() {
    this.asignationDataTeenService.findAllDataActive().subscribe((dataTeen: any) => {
      this.teenData = dataTeen;
    })
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
    /*console.log('Datos Adolescente:', this.asignationDataForm.value);
    const notes = this.asignationDataForm.get('notes')?.value;

    if (notes) {
      let selectedTeenIDs = this.asignationDataForm.get('id_teenager')?.value;

      if (selectedTeenIDs.includes('all')) {
        // Si "Seleccionar todo" está seleccionado, incluye todos los adolescentes
        selectedTeenIDs = this.teenData.map(teen => teen.id);
      }

      // Modifica los IDs para que coincidan con la estructura esperada
      const idTeenagerArray = selectedTeenIDs.map((id: number) => ({ "id_teenager": id }));

      const dto = {
        notes: notes,
        id_activities: this.asignationDataForm.get('id_activities')?.value, // Asegúrate de que este valor sea el ID correcto
        start_date: this.asignationDataForm.get('start_date')?.value,
        duration: this.asignationDataForm.get('duration')?.value,
        participation_status: this.asignationDataForm.get('participation_status')?.value,
        id_teenager: idTeenagerArray,
        active: 'A',
      };

      this.asignationService.saveMasive(dto).subscribe(
        () => {
          this.asignationDataForm.reset();
          this.navigateToAsignationList();
        },
        error => {
          console.error("Error al guardar datos: ", error);
          console.log('Datos Adolescente Error:', this.asignationDataForm.value);
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
    const idTeenControl = this.asignationDataForm.get('id_teenager');

    if (idTeenControl) {
      const allTeenIDs = this.teenData.map(teen => teen.id);

      if (this.isAllSelected()) {
        // Si el checkbox está marcado, deselecciona todos los adolescentes
        idTeenControl.patchValue([]);
      } else {
        // Si el checkbox no está marcado, selecciona todos los adolescentes
        idTeenControl.patchValue(allTeenIDs);
      }

      // Actualiza el estado del formulario después de cambiar el valor
      idTeenControl.updateValueAndValidity();
    }
  }




  isAllSelected(): boolean {
    const idTeenControl = this.asignationDataForm.get('id_teenager');
    const allTeenIDs = this.teenData.map(teen => teen.id_teenager);
    if (idTeenControl) {  // Verifica que idTeenControl no sea nulo
      return JSON.stringify(idTeenControl.value) === JSON.stringify(allTeenIDs);
    }
    return false;  // Devuelve false en caso de que idTeenControl sea nulo
  }


  ngOnDestroy(): void {
    /*this.asignationService.transactionSelected = undefined;*/
  }

}
