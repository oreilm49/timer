import {Component, OnInit} from '@angular/core';
import {dateEntry, ReturnedLabelObject, TaskObject, NewLabelObject, AddLabel} from "../../../objects";
import {LabelObject} from "../../../objects"
import {TaskService} from "../../../services/task.service";
import {LabelService} from "../../../services/label.service";
import {ValidatorService} from "../../../services/validator.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  tasks: TaskObject[];
  labels: ReturnedLabelObject[] = [];
  completedTasks: TaskObject[];

  userId: string;
  // task form variables
  name: string;
  duration: number;
  start_time: dateEntry;
  label: NewLabelObject[];
  end_time: number;
  id: string;
  dropdownSettings = {};

  constructor(
              private taskService: TaskService,
              private labelService: LabelService,
              private validatorService: ValidatorService,
              private flashMessagesService: FlashMessagesService,
              public afAuth: AngularFireAuth
              ) {
  }

  ngOnInit() {
    this.getTasks(this.userId);
    this.getLabels(this.userId);
    this.getCompletedTasks(this.userId);
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in: '+res.uid);
        this.userId = res.uid;
      } else {
        console.log('user not logged in');
      }
    });
  }

  onTaskSubmit() {
    let date=this.start_time;
    let newDate = date.month+"/"+date.day+"/"+date.year;
    let newDateNumber = new Date(newDate).getTime();

    const task: TaskObject = {
      user: this.userId,
      _id: this.id,
      name: this.name,
      duration: this.duration,
      start_time: newDateNumber,
      end_time: this.end_time
    };

    // Required Fields
    if (!this.validatorService.validateTask(task)) {
      this.flashMessagesService.show('Please update all fields', {cssClass: 'alert-danger', timeout: 3000})
    } else {
      this.taskService.addTask(task)
        .subscribe(val => {
            //this.taskList.tasks.push(val);
            this.tasks.push(val);
            this.name = '';
            this.duration = 0;
            this.start_time = new dateEntry;
            this.name = '';

            const labelsToAdd = [];
            for(let i = 0;i < this.label.length;i++) {
              labelsToAdd.push(this.label[i]._id)
            }
            this.labelService.taskToLabel(
              {
                task: val._id,
                labels: labelsToAdd
              }
            )
              .subscribe(
                value => {
                  console.log("new labels created: "+value)
                  this.label = [];
                },
                error => {
                  console.log("Error creating labels: "+error)
                }
              )
          },
          response => {
            console.log("POST call in error", response);
          });
    }
  }
  getTasks(user) {
    this.taskService.getAllTasks(user)
      .subscribe(
        (data: TaskObject) => this.tasks = data as any,
        response => {
          console.log("Error getting tasks: ", response);
        });
  }

  getLabels(user) {
    this.labelService.getAllLabels(user)
      .subscribe(
        (data: LabelObject) => this.labels = data as any,
        response => {
          console.log("Error getting labels: ", response);
        });
  }

  getCompletedTasks(user) {
    this.taskService.getCompletedTasks(user)
      .subscribe(
        (data: TaskObject) => this.completedTasks = data as any,
        response => {
          console.log("Error getting labels: ", response);
        });
  }

  deleteTaskFromActiveTasks(task): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }

  moveTaskToCompletedTasks(task): void {
    this.completedTasks.push(task);
  }

  deleteTaskFromView(task): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }

  deleteCompletedTask(task: TaskObject): void {
    console.log(task);
    this.completedTasks = this.completedTasks.filter(item => item !== task);
  }

  newLabelToList(label) {
    this.getLabels(this.userId)
  }

  removeTaskByIndex(index){
    console.log(index);
    this.tasks.splice(index, 1)
  }

  updateEditedTask(task) {
    this.tasks.push(task)
  }

  onItemSelect(item:any){
    console.log(this.label);
    this.label.push(
      item._id
    );
  }

  onItemDeSelect(label:any){
    this.label = this.label.filter(item => item !== label._id);
  }

}
