import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LabelsComponent } from './components/labels/labels.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';
import { HttpClientModule } from "@angular/common/http";
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";
import {MatTableModule} from "@angular/material";

import {TaskService} from "./services/task.service";
import {LabelService} from "./services/label.service";
import {ValidatorService} from "./services/validator.service";
import { TaskListComponent } from './components/tasks/task-form/task-list/task-list.component';
import { TaskPopoverComponent } from './components/tasks/task-form/task-list/task-popover/task-popover.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlashMessagesModule,
    MatTableModule,
    NgbModule.forRoot()
  ],
  providers: [TaskService, LabelService, ValidatorService, FlashMessagesService, TaskListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }