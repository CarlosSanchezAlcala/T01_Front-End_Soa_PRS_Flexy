import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './dashboard-components/sales/sales.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TeenDashboardInfoComponent } from './dashboard-components/teen-dashboard-info/teen-dashboard-info.component';
import { OperativeUnitDashboardInfoComponent } from './dashboard-components/operative-unit-dashboard-info/operative-unit-dashboard-info.component';




@NgModule({
  declarations: [
    DashboardComponent,
    SalesComponent,
    CardsComponent,
    TeenDashboardInfoComponent,
    OperativeUnitDashboardInfoComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports: [
    DashboardComponent,
    SalesComponent,
  ]
})
export class DashboardModule { }
