import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from "@angular/router";
import {Activities} from "../../component-funcionality/models/activities/activities.model";
import {HotToastService} from "@ngneat/hot-toast";
import {ActivitiesService} from "../../component-funcionality/services/activities/activities.service";

@Component({
  selector: 'app-activities-principal',
  templateUrl: './activities-principal.component.html',
  styleUrls: ['./activities-principal.component.scss']
})
export class ActivitiesPrincipalComponent implements OnInit {

  @ViewChild("activeActivities") paginator!: MatPaginator;
  @ViewChild("inactiveActivities") paginatorInactive!: MatPaginator;

  showFirstLastButtons: boolean = true;
  isDisabled: boolean = true;

  activiesDataActive: any[] = [];
  activiesDataInactive: any[] = [];
  activiesDataComplete: any[] = [];
  showDataActive = false;
  showDataInactive = false;
  selectedActivies: any;
  showDetails = false;
  displayedColumns: string[] = [
    'name',
    'duration',
    'place',
    'type',
    'soa',
    'actions',
    'moreInformation'
  ];

  dataSourceActive = new MatTableDataSource(this.activiesDataActive);
  dataSourceInactive = new MatTableDataSource(this.activiesDataInactive);

  constructor(public _activitiesService: ActivitiesService,
              private _router: Router,
              private toastService: HotToastService) { }

  ngOnInit(): void {
    this.findAllDataActiveActivies();
    this.findAllDataInactiveActivies();
  }

  navigateToForm() {
    this._router.navigate(['funcionary-form']).then(() => {
    });
  }

  findAllDataCompleteActivies() {
    this._activitiesService.findAll().subscribe((DataActiviesCompleteBD: any) => {
      this.activiesDataComplete = DataActiviesCompleteBD;
    });
  }

  findAllDataActiveActivies() {
    this._activitiesService.findAllDataActive().subscribe((DataActiviesActiveBD: any) => {
      console.log('Data Activies Active:', DataActiviesActiveBD);
      this.activiesDataActive = DataActiviesActiveBD;
      this.dataSourceActive = new MatTableDataSource(this.activiesDataActive);
      this.dataSourceActive.paginator = this.paginator;
    });
  }

  findAllDataInactiveActivies() {
    this._activitiesService.findAllDataInactive().subscribe((DataActiviesInactiveBD: any) => {
      this.activiesDataInactive = DataActiviesInactiveBD;
      this.dataSourceInactive = new MatTableDataSource(this.activiesDataInactive);
      this.dataSourceInactive.paginator = this.paginatorInactive;
    });
  }

  deleteLogicalDataFuncionary(activities: Activities) {
    this._activitiesService.deleteLogicalDataTeen(activities).subscribe((DataActiviesInactiveBD: any) => {
      this.findAllDataActiveActivies();
      this.toastService.error('Eliminado exitosamente!');
    });
  }

  reactiveLogicalDataFuncionary(activities: Activities) {
    this._activitiesService.reactiveLogicalDataTeen(activities).subscribe((DataActiviesInactiveBD: any) => {
      this.findAllDataInactiveActivies();
      this.toastService.success('Activado exitosamente!');
    });
  }

  updateDataFuncionary() {
  }

  showFuncionaryDetails(funcionary: any) {
    this.selectedActivies = funcionary;
    this.showDetails = true;
  }

  closeDetails() {
    this.selectedActivies = null;
    this.showDetails = false;
  }

  showActive() {
    this.showDataActive = true;
    this.hideInactive();
    this.findAllDataActiveActivies();
  }

  hideActive() {
    this.showDataActive = false;
  }

  showInactive() {
    this.showDataInactive = true;
    this.hideActive();
    this.findAllDataInactiveActivies();
  }

  hideInactive() {
    this.showDataInactive = false;
  }

}
