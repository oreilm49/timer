import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { TasksComponent } from "./components/tasks/tasks.component";
import { LabelsComponent } from "./components/labels/labels.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'tasks', component: TasksComponent,canActivate: [AuthGuard]},
  { path: 'labels', component: LabelsComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
