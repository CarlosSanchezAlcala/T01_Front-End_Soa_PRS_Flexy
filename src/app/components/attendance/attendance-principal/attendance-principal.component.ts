import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AttendanceService} from "../../component-funcionality/services/attendance/attendance.service";
import {HotToastService} from "@ngneat/hot-toast";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-attendance-principal',
  templateUrl: './attendance-principal.component.html',
  styleUrls: ['./attendance-principal.component.scss']
})
export class AttendancePrincipalComponent implements OnInit {

  adolescentColumns: string[] = ['name', 'select'];
  dataSource: any[] = [];
  asistenciaList: any[] = [];
  activitiesList: any[] = [];
  programsList:any[]=[]
  idactividad: any;
  idPrograms: any;
  tableDataSources:any;

  dataTutor: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private attendanceService: AttendanceService, private toastService: HotToastService) { }

  ngOnInit(): void {
    this.listPrograms();
  }



  findbyIdActivity(idActivity: any) {
    /*this.asistenciaList =[];

    this.attendanceService.findbyIdActivity(idActivity).subscribe((res) => {
      this.tableDataSources = new MatTableDataSource<any[]>(res);
      this.tableDataSources.paginator = this.paginator;

      for (const data of res) {
        const asistencia = new AsistenciaDto();
        asistencia.idactiviti = data.activities.id;
        asistencia.idadolescente = data.teeneger.id_adolescente;
        asistencia.asistencia = "A";
        this.asistenciaList.push(asistencia)
      }

      console.log("automatico ", this.asistenciaList);
    })*/
  }

  selectedRows: any[] = [];

  selectRow(row: any, event: any) {
    if (event.checked) {
      if (event.source.value === 'F') {

        for (var i = 0; i < this.asistenciaList.length; i++) {
          if (this.asistenciaList[i].idadolescente == row.teeneger.id_adolescente) {
            this.asistenciaList[i].asistencia = "F";
          }
        }

      } else {
        for (var i = 0; i < this.asistenciaList.length; i++) {
          if (this.asistenciaList[i].idadolescente == row.teeneger.id_adolescente) {
            this.asistenciaList[i].asistencia = "T";
          }
        }
      }

      console.log(this.asistenciaList)
    }
  }

  registerAttendance() {
    /*for (const attendance of this.asistenciaList) {
      this.attendanceService.create(attendance).subscribe(res => {
        console.log("registrado " + res)
      })
    }
    this.toastService.success('Asistencia registrada con exito')

    this.findbyIdActivity(this.idactividad);
    this.asistenciaList = [];*/
  }

  listActivities(id:any) {
    /*this.attendanceService.listActivities(id).subscribe((res: any) => {
      this.activitiesList = res;
    })*/
  }


  listPrograms(){
    /*this.attendanceService.listPrograms().subscribe((res:any) => {
      this.programsList = res;
    })*/
  }
}
