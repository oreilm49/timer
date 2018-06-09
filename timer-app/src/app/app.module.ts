import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LabelsComponent } from './components/labels/labels.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { HttpClientModule } from "@angular/common/http";
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component'

import {TaskService} from "./services/task.service";
import {LabelService} from "./services/label.service";
import {ValidatorService} from "./services/validator.service";
import { TaskListComponent } from './components/tasks/task-form/task-list/task-list.component';
import { TaskPopoverComponent } from './components/tasks/task-form/task-list/task-popover/task-popover.component';
import { LabelAddComponent } from './components/tasks/task-form/label-add/label-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TaskEditPopoverComponent } from './components/tasks/task-form/task-list/task-edit-popover/task-edit-popover.component';
import { CompletedTasksComponent } from './components/tasks/task-form/completed-tasks/completed-tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashChartsComponent } from './components/dashboard/dash-charts/dash-charts.component';
import {DashboardService} from "./services/dashboard.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import { HomeComponent } from './components/home/home.component';
import { LabelListComponent } from './components/tasks/task-form/task-list/label-list/label-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksComponent,
    LabelsComponent,
    ProjectsComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskPopoverComponent,
    LabelAddComponent,
    TaskEditPopoverComponent,
    CompletedTasksComponent,
    DashboardComponent,
    DashChartsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LabelListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule,
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireAuthModule
  ],
  providers: [
    TaskService,
    LabelService,
    ValidatorService,
    FlashMessagesService,
    TaskListComponent,
    DashboardService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
