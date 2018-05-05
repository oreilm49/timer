import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LabelObject, TaskObject} from "../objects";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';

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
  taskToLabel(label: LabelObject): Observable<LabelObject> {
    return this.http.post<LabelObject>(this.taskToLabelUrl, label)
  };

  createLabel(label: LabelObject): Observable<LabelObject> {
    return this.http.get<LabelObject>(this.createLabelUrl+label)
  };

  getAllLabels(user) {
    return this.http.get(this.getAllLabelsUrl + user)
    // TODO include error catching method
  };

}
