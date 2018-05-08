import {Component, OnInit} from '@angular/core';
import {CompletedTask, dateEntry, ReturnedLabelObject, TaskObject, NewLabelObject, AddLabel} from "../../../objects";
import {LabelObject} from "../../../objects"
import {TaskService} from "../../../services/task.service";
import {LabelService} from "../../../services/label.service";
import {ValidatorService} from "../../../services/validator.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  tasks: TaskObject[];
  labels: ReturnedLabelObject[] = [];
  completedTasks: TaskObject[];

  userId = '1';
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
              private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.getTasks();
    this.getLabels();
    this.getCompletedTasks();
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
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
  getTasks() {
    this.taskService.getAllTasks('1')
      .subscribe(
        (data: TaskObject) => this.tasks = data as any,
        response => {
          console.log("Error getting tasks: ", response);
        });
  }

  getLabels() {
    this.labelService.getAllLabels('1')
      .subscribe(
        (data: LabelObject) => this.labels = data as any,
        response => {
          console.log("Error getting labels: ", response);
        });
  }

  getCompletedTasks() {
    this.taskService.getCompletedTasks('1')
      .subscribe(
        (data: CompletedTask) => this.completedTasks = data as any,
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
    console.log(label);
    this.labels.push(label)
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

  // onSelectAll(items: any){
  //   this.label.push(
  //     items
  //   );
  // }
}
