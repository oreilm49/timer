import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AddLabel, CreateLabelObject, NewLabelObject, ReturnedLabelObject, TaskObject} from "../objects";
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
export class LabelService {

  createLabelUrl: string = 'http://localhost:3000/api/label/create';
  getAllLabelsUrl: string = 'http://localhost:3000/api/labels/';
  taskToLabelUrl: string = 'http://localhost:3000/api/labels/addtask';

  constructor(private http: HttpClient) {
  }

  /** POST: add a new task to the database */
  taskToLabel(label: AddLabel): Observable<NewLabelObject[]> {
    return this.http.post<NewLabelObject[]>(this.taskToLabelUrl, label)
  };

  createLabel(label: CreateLabelObject): Observable<ReturnedLabelObject> {
    return this.http.post<CreateLabelObject>(this.createLabelUrl,label)
      .pipe(catchError(this.handleError))
  };

  getAllLabels(user) {
    return this.http.get(this.getAllLabelsUrl + user)
    // TODO include error catching method
  };
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
