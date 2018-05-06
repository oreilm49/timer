import {Component, OnInit} from '@angular/core';
import {ReturnedLabelObject, TaskObject} from "../../../objects";
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

  //calendar specific variables
  userId = '1';
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;
  tr: any;
  invalidDates: Array<Date>;

  // task form variables
  name: string;
  duration: number;
  start_time: Date;
  label: string;
  end_time: Date;

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  constructor(private taskService: TaskService,
              private labelService: LabelService,
              private validatorService: ValidatorService,
              private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["sun", "mon", "tue", "web", "thu", "fri", "sat"],
      dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      monthNames: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
      monthNamesShort: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
      today: 'today',
      clear: 'Clear'
    };

    this.tr = {
      firstDayOfWeek: 1
    };

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    this.getTasks();
    this.getLabels();

  }

  onTaskSubmit() {
    let date=this.start_time;
    let newDate=date.month+"/"+date.day+"/"+date.year;
    const task: TaskObject = {
      user: this.userId,
      name: this.name,
      duration: this.duration,
      start_time: new Date(newDate).getTime(),
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
            this.start_time = new Date();
            this.name = '';
            this.label = '';
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
  deleteTaskFromList(task): void {
    this.tasks = this.tasks.filter(item => item !== task);
  }

  newLabelToList(label) {
    console.log(label);
    this.labels.push(label)
  }
}
