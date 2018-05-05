import { Injectable } from '@angular/core';
import {TaskObject} from "../objects";
import {LabelObject} from "../objects";

@Injectable()
export class ValidatorService {

  constructor() { }
  validateTask(task: TaskObject){
    if(task.name == undefined || task.duration == undefined || task.start_time == undefined) {
      return false;
    } else {
      return true;
    }
  };

  validateTaskComplete(task: TaskObject){
    if(task.end_time == undefined) {
      return false;
    } else {
      return true;
    }
  };
  validateLabel(label: LabelObject) {
    return !(label.name == undefined || label.tasks == undefined)
  };
}
