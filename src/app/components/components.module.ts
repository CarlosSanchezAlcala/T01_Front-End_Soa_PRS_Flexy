import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ProgressComponent } from './progress/progress.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TeenPrincipalComponent } from './teen/teen-principal/teen-principal.component';
import { TeenFormComponent } from './teen/teen-form/teen-form.component';
import { AsignationPrincipalComponent } from './asignation/asignation-principal/asignation-principal.component';
import { AsignationFormComponent } from './asignation/asignation-form/asignation-form.component';
import { FuncionaryPrincipalComponent } from './funcionary/funcionary-principal/funcionary-principal.component';
import { FuncionaryFormComponent } from './funcionary/funcionary-form/funcionary-form.component'


@NgModule({
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        ButtonsComponent,
        SlideToggleComponent,
        SliderComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        SnackbarComponent,
        MenuComponent,
        TabsComponent,
        ExpansionComponent,
        ChipsComponent,
        ProgressComponent,
        FormsComponent,
        AlertsComponent,
        GridListComponent,
        TooltipsComponent,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [
    AlertsComponent,
    FormsComponent,
    GridListComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ChipsComponent,
    ProgressComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent,
    ButtonsComponent,
  ],
  declarations: [
    TeenPrincipalComponent,
    TeenFormComponent,
    AsignationPrincipalComponent,
    AsignationFormComponent,
    FuncionaryPrincipalComponent,
    FuncionaryFormComponent
  ]
})
export class ComponentsModule { }
