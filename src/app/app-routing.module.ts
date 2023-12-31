import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { TeenPrincipalComponent } from './components/teen/teen-principal/teen-principal.component';
import { TeenFormComponent } from "./components/teen/teen-form/teen-form.component";
import {
  AsignationPrincipalComponent
} from "./components/asignation/asignation-principal/asignation-principal.component";
import { AsignationFormComponent } from "./components/asignation/asignation-form/asignation-form.component";
import {
  FuncionaryPrincipalComponent
} from "./components/funcionary/funcionary-principal/funcionary-principal.component";
import { FuncionaryFormComponent } from './components/funcionary/funcionary-form/funcionary-form.component';
import { permissionsGuard } from './components/component-funcionality/guards/permissions.guard';
import {WelcomePrincipalComponent} from "./components/welcome/welcome-principal/welcome-principal.component";

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "home", canActivate: [permissionsGuard], component: DashboardComponent },
      { path: "alerts", component: AlertsComponent },
      { path: "asignation", canActivate: [permissionsGuard], component: AsignationPrincipalComponent },
      { path: "forms", component: FormsComponent },
      { path: "teen", canActivate: [permissionsGuard], component: TeenPrincipalComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
      { path: "teen-form", canActivate: [permissionsGuard], component: TeenFormComponent },
      { path: "asignation-form", canActivate: [permissionsGuard], component: AsignationFormComponent },
      { path: "asignation-list", component: AsignationPrincipalComponent },
      { path: "funcionary", canActivate: [permissionsGuard], component: FuncionaryPrincipalComponent },
      { path: "funcionary-form", canActivate: [permissionsGuard], component: FuncionaryFormComponent },
      { path: "welcome", component: WelcomePrincipalComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
