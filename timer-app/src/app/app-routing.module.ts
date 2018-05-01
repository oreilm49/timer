import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { TasksComponent } from "./components/tasks/tasks.component";
import { LabelsComponent } from "./components/labels/labels.component";
import { ProjectsComponent } from "./components/projects/projects.component";

const routes: Routes = [
  { path: 'tasks', component: TasksComponent},
  { path: 'labels', component: LabelsComponent},
  { path: 'projects', component: ProjectsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
