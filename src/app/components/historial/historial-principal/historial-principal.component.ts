import {Component, OnInit, ViewChild} from '@angular/core';
import {HistorialService} from "../../component-funcionality/services/historial/historial.service";
import {TeenService} from "../../component-funcionality/services/teen/teen.service";
import {FuncionaryService} from "../../component-funcionality/services/funcionary/funcionary.service";
import {ActivitiesService} from "../../component-funcionality/services/activities/activities.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceService} from "../../component-funcionality/services/attendance/attendance.service";
@Component({
  selector: 'app-historial-principal',
  templateUrl: './historial-principal.component.html',
  styleUrls: ['./historial-principal.component.scss']
})
export class HistorialPrincipalComponent implements OnInit {

  @ViewChild("paginatorActive") paginator!: MatPaginator;

  showFirstLastButtons: boolean = true;
  isDisabled: boolean = true;

  historialData: any[] = [];
  programsData: any[] = [];
  attendanceData: any[] = [];
  funcionaryData: any[] = [];
  teenData: any[] = [];
  activitiesData: any[] = [];
  displayedColumns: string[] = [
    'name',
    'beneficiary',
    'responsible',
    'date',
    'duration'
  ];

  dataSourceActive = new MatTableDataSource(this.historialData);

  constructor(private _historialService: HistorialService,
              private _teenService: TeenService,
              private _funcionaryService: FuncionaryService,
              private _activitiesService: ActivitiesService,
              private _attendanceService: AttendanceService) {
  }

  ngOnInit(): void {
    this.findAllDataTeenComplete();
    this.findAllDataFuncionaryComplete();
    this.findAllDataHistorialComplete();
    this.findAllDataActivitiesComplete();
    this.findAllDataAttendanceComplete();
  }

  findAllDataAttendanceComplete() {
    this._attendanceService.findAll().subscribe((dataAttendance: any) => {
      console.log('Attendance Data:', dataAttendance);
      this.attendanceData = dataAttendance;
    });
  }

  findAllDataHistorialComplete() {
    this._historialService.findAll().subscribe((dataHistorial: any) => {
      console.log('Historial Data', dataHistorial);
      this.historialData = dataHistorial;
      this.dataSourceActive = new MatTableDataSource(this.historialData);
      this.dataSourceActive.paginator = this.paginator;
    });
  }

  findAllDataTeenComplete() {
    this._teenService.findAll().subscribe((data: any) => {
      console.log('Teen Data:', data);
      this.teenData = data;
    });
  }

  findAllDataFuncionaryComplete() {
    this._funcionaryService.findAll().subscribe((data: any) => {
      this.funcionaryData = data;
    });
  }

  findAllDataActivitiesComplete() {
    this._activitiesService.findAll().subscribe((data: any) => {
      this.activitiesData = data;
    });
  }

  getDataCompleteProgramById(id_attendance: number) {
    // Find the program object in the programData array where id_program matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Concatenate relevant information and return the result
      return `${program.attendance}`;
    } else {
      // Return a message if the program is not found
      return 'Asistencia no encontrado.'; // Program not found.
    }
  }

  getDataCompleteProgramByDate(id_attendance: number) {
    // Find the program object in the programData array where id_program matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Concatenate relevant information and return the result
      return `${program.date}`;
    } else {
      // Return a message if the program is not found
      return 'fecha no encontrado.'; // Program not found.
    }
  }

  getDataCompleteProgramByActivities(id_attendance: number) {
    // Find the program object in the attendanceData array where id_attendance matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Convert id_activities to number
      const idActivities: number = parseInt(`${program.id_activities}`, 10);

      // Find the activity object in the activitiesData array where id matches
      const activity = this.activitiesData.find((item) => item.id_activities === idActivities);

      // Check if the activity is found
      if (activity) {
        // Return the name of the activity
        return `${activity.name}`;
      } else {
        // Return a message if the activity is not found
        return 'Actividad no encontrada.';
      }
    } else {
      // Return a message if the program is not found
      return 'Programa no encontrado.';
    }
  }


  getDataCompleteProgramByPrograma(id_attendance: number) {
    // Find the program object in the attendanceData array where id_attendance matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Convert id_activities to number
      const idActivities: number = parseInt(`${program.id_programs}`, 10);

      // Find the activity object in the activitiesData array where id matches
      const activity = this.programsData.find((item) => item.id_program === idActivities);

      // Check if the activity is found
      if (activity) {
        // Return the name of the activity
        return `${activity.name}`;
      } else {
        // Return a message if the activity is not found
        return 'Actividad no encontrada.';
      }
    } else {
      // Return a message if the program is not found
      return 'Programa no encontrado.';
    }
  }



  getDataCompleteProgramByFuncionary(id_attendance: number) {
    // Find the program object in the programData array where id_program matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Convert id_activities to number
      const idActivities: number = parseInt(`${program.id_funcionary}`, 10);

      // Find the activity object in the activitiesData array where id matches
      const activity = this.funcionaryData.find((item) => item.id_funcionary === idActivities);

      // Check if the activity is found
      if (activity) {
        // Return the name of the activity
        return `${activity.name} ${activity.surnameFather} ${activity.surnameMother}`;
      } else {
        // Return a message if the activity is not found
        return 'Responsable no encontrada.';
      }
    } else {
      // Return a message if the program is not found
      return 'Responsable no encontrado.';
    }
  }

  filterTeenagersByAttendance(id_attendance: number): any[] {
    // Find the program object in the programData array where id_program matches
    const program = this.attendanceData.find((item) => item.id_attendance === id_attendance);

    // Check if the program is found
    if (program) {
      // Convert id_activities to number
      const idActivities: number = parseInt(`${program.id_teen}`, 10);

      // Filter the teenagerData array based on the id
      const filteredTeenagers = this.teenData.filter((item) => item.id_teen === idActivities);

      return filteredTeenagers;
    } else {
      // Return an empty array if the program is not found
      return [];
    }
  }

  getDataCompleteProgramByTennager(id_attendance: number) {
    const filteredTeenagers = this.filterTeenagersByAttendance(id_attendance);

    if (filteredTeenagers.length > 0) {
      // If there are filtered teenagers, return the formatted string
      const teenager = filteredTeenagers[0]; // Assuming there's only one match
      return `${teenager.surnameFather} ${teenager.surnameMother}, ${teenager.name}`;
    } else {
      return 'Adolescente no encontrado.';
    }
  }

}
