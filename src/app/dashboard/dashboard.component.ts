import {Component, OnInit, ViewChild} from '@angular/core';
import {TeenDashboardInfoComponent} from "./dashboard-components/teen-dashboard-info/teen-dashboard-info.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('teenDashboardInfo') teenDashboardInfo: TeenDashboardInfoComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  listTeenInfo() {
    this.teenDashboardInfo?.findAllDataActiveTeen();
  }

}
