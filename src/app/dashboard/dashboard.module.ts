import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TeenDashboardInfoComponent } from './dashboard-components/teen-dashboard-info/teen-dashboard-info.component';
import { OperativeUnitDashboardInfoComponent } from './dashboard-components/operative-unit-dashboard-info/operative-unit-dashboard-info.component';
import { TransferDashboardInfoComponent } from './dashboard-components/transfer-dashboard-info/transfer-dashboard-info.component';
import {NgxDocViewerModule} from "ngx-doc-viewer";

@NgModule({
  declarations: [
    DashboardComponent,
    CardsComponent,
    TeenDashboardInfoComponent,
    OperativeUnitDashboardInfoComponent,
    TransferDashboardInfoComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    NgxDocViewerModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
