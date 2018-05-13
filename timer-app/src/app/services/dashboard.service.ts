import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {LabelData, TaskData, CountDuration} from "../objects";

@Injectable()
export class DashboardService {
  taskDataUrl: string = 'http://localhost:3000/api/label/tasks/';
  completedDataUrl: string = 'http://localhost:3000/api/tasks/completed/scheduled/';
  countDurationUrl: string = 'http://localhost:3000/api/tasks/averagetime/';

  constructor(private http: HttpClient) { }

  getTaskData(period): Observable<LabelData[]> {
    return this.http.get<LabelData[]>(this.taskDataUrl+period)
      .pipe(catchError(this.handleError))
  }
  getCompletedData(period): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(this.completedDataUrl+period)
      .pipe(catchError(this.handleError))
  }
  getCountDurationData(period): Observable<CountDuration> {
    return this.http.get<CountDuration>(this.countDurationUrl+period)
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
