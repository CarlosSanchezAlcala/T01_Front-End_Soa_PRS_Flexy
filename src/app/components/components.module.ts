import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeenPrincipalComponent } from './teen/teen-principal/teen-principal.component';
import { TeenFormComponent } from './teen/teen-form/teen-form.component';
import { AsignationPrincipalComponent } from './asignation/asignation-principal/asignation-principal.component';
import { AsignationFormComponent } from './asignation/asignation-form/asignation-form.component';
import { FuncionaryPrincipalComponent } from './funcionary/funcionary-principal/funcionary-principal.component';
import { FuncionaryFormComponent } from './funcionary/funcionary-form/funcionary-form.component';
import { ArchivosComponent } from './archivos/archivos/archivos.component';
import { WelcomePrincipalComponent } from './welcome/welcome-principal/welcome-principal.component';
import { ActivitiesPrincipalComponent } from './activities/activities-principal/activities-principal.component';
import { ActivitiesFormComponent } from './activities/activities-form/activities-form.component';
import { CooperatingEntitiesPrincipalComponent } from './cooperatingEntities/cooperating-entities-principal/cooperating-entities-principal.component';
import { CooperatingEntitiesFormComponent } from './cooperatingEntities/cooperating-entities-form/cooperating-entities-form.component';
import { AsignationProgramPrincipalComponent } from './asignationProgram/asignation-program-principal/asignation-program-principal.component';
import { AsignationProgramFormComponent } from './asignationProgram/asignation-program-form/asignation-program-form.component';
import { NotificationsPrincipalComponent } from './notifications/notifications-principal/notifications-principal.component';
import { NotificationsFormComponent } from './notifications/notifications-form/notifications-form.component';
import { RecordPrincipalComponent } from './record/record-principal/record-principal.component';
import { RecordFormComponent } from './record/record-form/record-form.component';
import { AsignationActTeenPrincipalComponent } from './asignationActTeen/asignation-act-teen-principal/asignation-act-teen-principal.component';
import { AsignationActTeenFormComponent } from './asignationActTeen/asignation-act-teen-form/asignation-act-teen-form.component';
import { OperativeUnitPrincipalComponent } from './operativeUnit/operative-unit-principal/operative-unit-principal.component';
import { OperativeUnitFormComponent } from './operativeUnit/operative-unit-form/operative-unit-form.component';
import { ProgramsPrincipalComponent } from './programs/programs-principal/programs-principal.component';
import { ProgramsFormComponent } from './programs/programs-form/programs-form.component';
import { OperativeUnitAsignationProgramPrincipalComponent } from './operativeUnitAsignationProgram/operative-unit-asignation-program-principal/operative-unit-asignation-program-principal.component';
import { OperativeUnitAsignationProgramFormComponent } from './operativeUnitAsignationProgram/operative-unit-asignation-program-form/operative-unit-asignation-program-form.component';
import { DigitalExpedientPrincipalComponent } from './digitalExpedient/digital-expedient-principal/digital-expedient-principal.component';
import { AsignationMasivPrincipalComponent } from './asignationMasivData/asignation-masiv-principal/asignation-masiv-principal.component';
import { AttendancePrincipalComponent } from './attendance/attendance-principal/attendance-principal.component';
import { ViewAttendancePrincipalComponent } from './viewAttendance/view-attendance-principal/view-attendance-principal.component';

@NgModule({
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [],
  declarations: [
    TeenPrincipalComponent,
    TeenFormComponent,
    AsignationPrincipalComponent,
    AsignationFormComponent,
    FuncionaryPrincipalComponent,
    FuncionaryFormComponent,
    ArchivosComponent,
    WelcomePrincipalComponent,
    ActivitiesPrincipalComponent,
    ActivitiesFormComponent,
    CooperatingEntitiesPrincipalComponent,
    CooperatingEntitiesFormComponent,
    AsignationProgramPrincipalComponent,
    AsignationProgramFormComponent,
    NotificationsPrincipalComponent,
    NotificationsFormComponent,
    RecordPrincipalComponent,
    RecordFormComponent,
    AsignationActTeenPrincipalComponent,
    AsignationActTeenFormComponent,
    OperativeUnitPrincipalComponent,
    OperativeUnitFormComponent,
    ProgramsPrincipalComponent,
    ProgramsFormComponent,
    OperativeUnitAsignationProgramPrincipalComponent,
    OperativeUnitAsignationProgramFormComponent,
    DigitalExpedientPrincipalComponent,
    AsignationMasivPrincipalComponent,
    AttendancePrincipalComponent,
    ViewAttendancePrincipalComponent,
  ]
})
export class ComponentsModule { }
