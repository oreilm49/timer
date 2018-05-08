import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CompletedTask, TimeObject, TaskObject, dateEntry} from "../../../../../objects";
import {ValidatorService} from "../../../../../services/validator.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {TaskService} from "../../../../../services/task.service";
import {LabelService} from "../../../../../services/label.service";
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-popover',
  templateUrl: './task-popover.component.html',
  styleUrls: ['./task-popover.component.css'],
  providers: [NgbPopoverConfig]
})
export class TaskPopoverComponent implements OnInit {
  @Input() activeTask: CompletedTask;
  @Output() completeTask = new EventEmitter<TaskObject>();
  @Output() closePop = new EventEmitter();
  // task form variables
  userId: '1';
  id: string;
  name: string;
  duration: number;
  start_time: dateEntry;
  label: string;
  end_time: number;
  time: TimeObject;

  //time input controls
  minuteStep = 15;
  meridian = true;


  constructor(
    private validatorService: ValidatorService,
    private flashMessagesService: FlashMessagesService,
    private taskService: TaskService,
    private labelService: LabelService,
    config: NgbPopoverConfig
  ) {
    config.container = 'body';
  }

  ngOnInit() {

  }

  taskFinished() {
    let newDateNumber = this.activeTask.start_time;
    //convert newely selected date to number formant
    if (this.start_time) {
      let date=this.start_time;
      let newDate = date.month+"/"+date.day+"/"+date.year;
      newDateNumber = new Date(newDate).getTime();
    }

    // check for fields with no user input, assign preselected values
    if (this.id == undefined) {
      this.id = this.activeTask._id;
    }
    if (this.name == undefined) {
      this.name = this.activeTask.name;
    }
    if (this.duration == undefined) {
      this.duration = this.activeTask.duration;
    }
    if (this.end_time == undefined && this.activeTask.end_time !== undefined) {
      this.end_time = this.activeTask.end_time;
    }

    // compute time of completion (start date + start time + duration)
    const finish_time = newDateNumber + (this.time.hour*3600000) + (this.time.minute*60000) + (this.duration*60000);

    const task: CompletedTask = {
      user: this.userId,
      _id: this.id,
      name: this.name,
      duration: this.duration,
      start_time: newDateNumber,
      end_time: finish_time
    };

    // Required Fields Validation
    if (!this.validatorService.validateTaskComplete(task)) {
      this.flashMessagesService.show('Please update task end time', {cssClass: 'alert-danger', timeout: 3000})
    } else {
      this.taskService.completeTask(task)
        .subscribe(val => {
            const emitTask: TaskObject = {
              user: val.user,
              _id: val._id,
              name: val.name,
              duration: val.duration,
              start_time: val.start_time,
              end_time: finish_time
            };
            console.log(emitTask);
            this.completeTask.emit(emitTask);
            this.closePop.emit();
          },
          response => {
            console.log("POST call in error", response);
          });
    }
  }
}
