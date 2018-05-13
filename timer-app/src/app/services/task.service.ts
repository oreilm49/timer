import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TaskObject} from "../objects";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable()
export class TaskService {
  createTaskUrl: string = 'http://localhost:3000/api/task/create';
  getAllTasksUrl: string = 'http://localhost:3000/api/task/user/';
  deleteTaskUrl: string = 'http://localhost:3000/api/task/delete/';
  getTaskByIdUrl: string = 'http://localhost:3000/api/task/id/';
  completeTaskUrl: string = 'http://localhost:3000/api/task/update/';
  getCompletedTasksUrl: string = 'http://localhost:3000/api/task/completed/';

  constructor(private http: HttpClient) { }

  /** POST: add a new task to the database */
  addTask (task: TaskObject): Observable<TaskObject> {
    return this.http.post<TaskObject>(this.createTaskUrl,task)
      .pipe(catchError(this.handleError))
  }

  getAllTasks(user): Observable<TaskObject> {
    return this.http.get<TaskObject>(this.getAllTasksUrl+user)
      .pipe(catchError(this.handleError))
  }

  getTaskById(id): Observable<TaskObject> {
    return this.http.get<TaskObject>(this.getTaskByIdUrl+id)
      .pipe(catchError(this.handleError))
  }

  deleteTaskById(id: string): Observable<TaskObject> {
    return this.http.get<TaskObject>(this.deleteTaskUrl+id)
      .pipe(catchError(this.handleError))
  }

  completeTask(task: TaskObject): Observable<TaskObject> {
    return this.http.post<TaskObject>(this.completeTaskUrl,task)
      .pipe(catchError(this.handleError))
  }

  getCompletedTasks(user): Observable<TaskObject> {
    return this.http.get<TaskObject>(this.getCompletedTasksUrl+user)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    // if front end error
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message)
    }
    // if backend error
    else {
      console.error(`Backend returned code ${error.status},`+ `body was: ${error.error}`)
    }
    return new ErrorObservable('Error occurred, Please try again');
  };

}
