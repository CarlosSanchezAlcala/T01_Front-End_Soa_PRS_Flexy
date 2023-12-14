import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AsignationService} from '../../component-funcionality/services/asignation/asignation.service';
import {FuncionaryService} from '../../component-funcionality/services/funcionary/funcionary.service';
import {TeenService} from '../../component-funcionality/services/teen/teen.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-asignation-form',
  templateUrl: './asignation-form.component.html',
  styleUrls: ['./asignation-form.component.scss']
})
export class AsignationFormComponent implements OnInit, OnDestroy {

  asignationDataForm: FormGroup = new FormGroup({});
  funcionaryData: any[] = [];
  currentDate: Date = new Date();
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
      id_teen: [[]],
      function_start: [''],
      date_hour_register: [''],
      status: ['A'],
      description: [''],
    });
    console.log('Datos del formulario: ', this.asignationDataForm.value);

    if (this.asignationService.transactionSelected) {
      const teens = [];
      teens.push(this.asignationService.transactionSelected.idTeen);
      console.log('Data', teens);
      //this.asignationDataForm.patchValue(this.asignationService.transactionSelected);
      this.asignationDataForm.patchValue({
        id_teen: teens,
        status: this.asignationService.transactionSelected.status,
        description: this.asignationService.transactionSelected.description,
        id_funcionary: this.asignationService.transactionSelected.id_funcionary,
        id_funcionaryteend: this.asignationService.transactionSelected.id_funcionaryteend,
        function_start: this.asignationService.transactionSelected.function_start,
        date_hour_register: this.asignationService.transactionSelected.date_hour_register,
      });
    }
  }

  ngOnInit(): void {
    this.findAllDataFuncionaryRankLegalGuardian();
    this.findAllTeen();
    this.dateAndHour();
    //this.finAllDataTeenNoRegistered();
  }


  navigateToAsignationList() {
    this.router.navigate(['asignation-list']).then(() => {
      // console.log('Se está redirigiendo a la lista de todas las asignaciones.')
    });
  }

  dateAndHour() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
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
      console.log('Teen: ', dataTeen);
      this.teenData = dataTeen;
    })
  }

  /*
  finAllDataTeenNoRegistered() {
    this.asignationService.findDataTeenNoRegistered().subscribe((dataTeenNoRegistered: any) => {
      console.log('Teen no registered: ', dataTeenNoRegistered);
      this.teenData = dataTeenNoRegistered;
    })
  }
*/

  isRegisteredTeen(id_teen: number) : boolean {
    const teens: number [] = this.asignationDataForm.controls['id_teen'].value;
    teens.find((teen: number) => teen === id_teen);
    return teens.length <= 0;
  }

  saveAsignation() {
    if (this.asignationService.transactionSelected) {
      // Actualizar || Modificar
      this.updateDataExistentAsignation();
    } else {
      // Registrar || Crear
      this.registerNewDataAsignation();
      this.navigateToAsignationList();
    }
  }

  registerNewDataAsignation() {
    const description = this.asignationDataForm.get('description')?.value;
    const idFuncionary = this.asignationDataForm.get('id_funcionary')?.value;
    if (description && idFuncionary) {
      let selectedTeenIDs = this.asignationDataForm.get('id_teen')?.value;
      if (selectedTeenIDs.includes('all')) {
        selectedTeenIDs = this.teenData.map(teen => teen.id_teen);
      }
      const selectedTeensData = this.teenData.filter((teen: any) => selectedTeenIDs.includes(teen.id_teen));

      const functionStartRaw = this.asignationDataForm.get('function_start')?.value;
      const functionStartFormatted = new Date(functionStartRaw);
      const year = functionStartFormatted.getFullYear();
      const month = (functionStartFormatted.getMonth() + 1).toString().padStart(2, '0');
      const day = functionStartFormatted.getDate().toString().padStart(2, '0');
      const formattedFunctionStart = `${year}-${month}-${day}`;
      const dto = {
        description: description,
        id_funcionary: idFuncionary,
        function_start: formattedFunctionStart,
        teens: selectedTeensData
      };
      console.log('DTO: ', dto);
      // Llama al método savebulk en tu servicio
      this.asignationService.saveMasive(dto).subscribe(
        () => {
          // Éxito, hacer algo si es necesario
          this.asignationDataForm.reset();
          // Redirigir después de guardar exitosamente
          this.navigateToAsignationList();
          console.error("Data in Form", dto);
        },
        error => {
          console.error("Error al guardar datos: ", error);
        }
      );
    } else {
      console.error("Los datos del formulario son nulos o faltantes.");
    }

    this.navigateToAsignationList();

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
