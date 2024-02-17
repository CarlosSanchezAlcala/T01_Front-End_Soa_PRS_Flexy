import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { TeenPrincipalComponent } from './components/teen/teen-principal/teen-principal.component';
import { TeenFormComponent } from "./components/teen/teen-form/teen-form.component";
import { AsignationPrincipalComponent } from "./components/asignation/asignation-principal/asignation-principal.component";
import { AsignationFormComponent } from "./components/asignation/asignation-form/asignation-form.component";
import { FuncionaryPrincipalComponent } from "./components/funcionary/funcionary-principal/funcionary-principal.component";
import { FuncionaryFormComponent } from './components/funcionary/funcionary-form/funcionary-form.component';
import { permissionsGuard } from './components/component-funcionality/guards/permissions.guard';
import { WelcomePrincipalComponent } from "./components/welcome/welcome-principal/welcome-principal.component";
import { ActivitiesPrincipalComponent } from "./components/activities/activities-principal/activities-principal.component";
import { CooperatingEntitiesPrincipalComponent } from "./components/cooperatingEntities/cooperating-entities-principal/cooperating-entities-principal.component";
import { AsignationProgramPrincipalComponent } from "./components/asignationProgram/asignation-program-principal/asignation-program-principal.component";
import { NotificationsPrincipalComponent } from "./components/notifications/notifications-principal/notifications-principal.component";
import { RecordPrincipalComponent } from "./components/record/record-principal/record-principal.component";
import { AsignationActTeenPrincipalComponent } from "./components/asignationActTeen/asignation-act-teen-principal/asignation-act-teen-principal.component";
import { AsignationActTeenFormComponent } from "./components/asignationActTeen/asignation-act-teen-form/asignation-act-teen-form.component";
import { OperativeUnitPrincipalComponent } from "./components/operativeUnit/operative-unit-principal/operative-unit-principal.component";
import { OperativeUnitFormComponent } from "./components/operativeUnit/operative-unit-form/operative-unit-form.component";
import { ProgramsPrincipalComponent } from "./components/programs/programs-principal/programs-principal.component";
import { ProgramsFormComponent } from "./components/programs/programs-form/programs-form.component";
import { OperativeUnitAsignationProgramPrincipalComponent } from "./components/operativeUnitAsignationProgram/operative-unit-asignation-program-principal/operative-unit-asignation-program-principal.component";
import { OperativeUnitAsignationProgramFormComponent } from "./components/operativeUnitAsignationProgram/operative-unit-asignation-program-form/operative-unit-asignation-program-form.component";
import { DigitalExpedientPrincipalComponent } from "./components/digitalExpedient/digital-expedient-principal/digital-expedient-principal.component";
import {
  AsignationMasivPrincipalComponent
} from "./components/asignationMasivData/asignation-masiv-principal/asignation-masiv-principal.component";
import {
  AttendancePrincipalComponent
} from "./components/attendance/attendance-principal/attendance-principal.component";
import {
  ViewAttendancePrincipalComponent
} from "./components/viewAttendance/view-attendance-principal/view-attendance-principal.component";

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: ""                            , redirectTo: "welcome"           , pathMatch: "full" },
      { path: "home"                        , canActivate: [permissionsGuard] , component: DashboardComponent },
      { path: "asignation"                  , canActivate: [permissionsGuard] , component: AsignationPrincipalComponent },
      { path: "teen"                        , canActivate: [permissionsGuard] , component: TeenPrincipalComponent },
      { path: "teen-form"                   , canActivate: [permissionsGuard] , component: TeenFormComponent },
      { path: "asignation-form"             , canActivate: [permissionsGuard] , component: AsignationFormComponent },
      { path: "asignation-list"                                               , component: AsignationPrincipalComponent },
      { path: "funcionary"                  , canActivate: [permissionsGuard] , component: FuncionaryPrincipalComponent },
      { path: "funcionary-form"             , canActivate: [permissionsGuard] , component: FuncionaryFormComponent },
      { path: "welcome"                                                       , component: WelcomePrincipalComponent},
      { path: "activities"                  , canActivate: [permissionsGuard] , component: ActivitiesPrincipalComponent },
      { path: "entities"                    , canActivate: [permissionsGuard] , component: CooperatingEntitiesPrincipalComponent },
      { path: "asignationProgram"           , canActivate: [permissionsGuard] , component: AsignationProgramPrincipalComponent },
      { path: "notifications"               , canActivate: [permissionsGuard] , component: NotificationsPrincipalComponent },
      { path: "record"                      , canActivate: [permissionsGuard] , component: RecordPrincipalComponent },
      { path: "asignationActTeen"           , canActivate: [permissionsGuard] , component: AsignationActTeenPrincipalComponent },
      { path: "asignationActTeenForm"       , canActivate: [permissionsGuard] , component: AsignationActTeenFormComponent },
      { path: "operativeUnit"               , canActivate: [permissionsGuard] , component: OperativeUnitPrincipalComponent },
      { path: "operativeUnitForm"           , canActivate: [permissionsGuard] , component: OperativeUnitFormComponent },
      { path: "programsAsist"               , canActivate: [permissionsGuard] , component: ProgramsPrincipalComponent },
      { path: "programsAsitForm"            , canActivate: [permissionsGuard] , component: ProgramsFormComponent },
      { path: "unitOperativeProgram"        , canActivate: [permissionsGuard] , component: OperativeUnitAsignationProgramPrincipalComponent },
      { path: "unitOperativeProgramForm"    , canActivate: [permissionsGuard] , component: OperativeUnitAsignationProgramFormComponent },
      { path: "digitalExpedient"            , canActivate: [permissionsGuard] , component: DigitalExpedientPrincipalComponent },
      { path: "asignationMasiv"             , canActivate: [permissionsGuard] , component: AsignationMasivPrincipalComponent },
      { path: "attendance"                  , canActivate: [permissionsGuard] , component: AttendancePrincipalComponent },
      { path: "viewAttendance"              , canActivate: [permissionsGuard] , component: ViewAttendancePrincipalComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
