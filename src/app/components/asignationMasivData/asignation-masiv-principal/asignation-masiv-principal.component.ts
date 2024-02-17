import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {HotToastService} from "@ngneat/hot-toast";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-asignation-masiv-principal',
  templateUrl: './asignation-masiv-principal.component.html',
  styleUrls: ['./asignation-masiv-principal.component.scss']
})
export class AsignationMasivPrincipalComponent implements OnInit {

  adolescentColumns: string[] = ['select', 'name', 'Apellidos', 'dni'];
  dataTutor: any[] = [];
  idTutorAnterior: any;
  idTutornuevo: any;
  dataSouceUpdate: any[] = [];
  attorneyForm!: FormGroup;
  selection = new SelectionModel<any>(true, []);
  tableDataSources: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  seleccionados: any;

  constructor(private fb: FormBuilder,
              //private bulkAllocationService: BulkAllocationService,
              private router: Router,
              public dialog: MatDialog,
              private toastService: HotToastService) {
  }

  ngOnInit(): void {

    this.attorneyForm = this.fb.group({
      description: ['', Validators.required],
      start_date: ['', Validators.required]
    })

    this.findAll();
    //this.findAllTutor();
  };


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSources.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    /*
        for (const teen of this.tableDataSources) {
          let updateTutorData: TutorDto = {
            teenId: teen.transaccionalAllocation.id_adolescente
          };

          this.dataSouceUpdate.push(updateTutorData);
        };

        console.log(this.dataSouceUpdate)
        this.isAllSelected() ?
          this.selection.clear() :
          this.tableDataSources.forEach((row: any) => this.selection.select(row));*/
  }

  seleccionado(seleccionado: any) {
    /*this.selection.toggle(seleccionado);
    let seleccionadoFormat: TutorDto = {
      teenId: seleccionado.transaccionalAllocation.id_adolescente
    };
    //this.dataSouceUpdate = seleccionadoFormat;
    this.dataSouceUpdate.push(seleccionadoFormat)
    console.log("seleccionado" + this.dataSouceUpdate);*/
  }

  findAll() {
    /*this.bulkAllocationService.findAll().subscribe((res) => {
      this.tableDataSources = new MatTableDataSource(res);
      this.tableDataSources.paginator = this.paginator;
      console.log(res)
    });*/
  }

  UpdateTutores() {
    /*const updateTutorData = new UpdateTutorDto();
    updateTutorData.legalGuardianId = this.idTutornuevo,
      updateTutorData.description = this.attorneyForm.value.description,
      updateTutorData.teens = this.dataSouceUpdate,
      updateTutorData.start_date = this.attorneyForm.value.start_date,

      console.log(updateTutorData)

    this.bulkAllocationService.UpdateAdolescent(updateTutorData).subscribe(res => {
      console.log(res)
    })


    this.findAll();
    this.selection.clear();
    this.idTutorAnterior = '';
    this.idTutornuevo = '';
    this.dataSouceUpdate = [];
    this.attorneyForm.reset();
    this.toastService.success('Actulalizacion de Tutor con exito ')
  }

  findAllTutor() {
    this.bulkAllocationService.findAlltutor().subscribe((res) => {
      this.dataTutor = res
      console.log(res)
    });*/
  }

  findbyIdTutor(idTutor: any) {
    /*this.bulkAllocationService.findbyIdTutor(idTutor).subscribe((res) => {
      this.tableDataSources = new MatTableDataSource<any[]>(res);
      this.tableDataSources.paginator = this.paginator;

    });*/
  }

  openDialog(): void {
    /*const dialogRef = this.dialog.open(ViewFuncionaryComponent,{
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }*/
  }
}
