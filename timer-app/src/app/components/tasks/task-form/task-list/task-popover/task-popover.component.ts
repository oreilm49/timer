import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CompletedTask, LabelObject, TaskObject} from "../../../../../objects";
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
  start_time: Date;
  label: string;
  end_time: Date;


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
    if (this.id == undefined) {
      this.id = this.activeTask._id;
    }
    if (this.name == undefined) {
      this.name = this.activeTask.name;
    }
    if (this.duration == undefined) {
      this.duration = this.activeTask.duration;
    }
    if (this.start_time == undefined) {
      this.start_time = this.activeTask.start_time;
    }
    if (this.end_time == undefined && this.activeTask.end_time !== undefined) {
      this.end_time = this.activeTask.end_time;
    }

    const task: CompletedTask = {
      user: this.userId,
      _id: this.id,
      name: this.name,
      duration: this.duration,
      start_time: this.start_time,
      end_time: this.end_time
    };

    const label: LabelObject = {
      user: this.userId,
      name: this.label,
      task: this.name
    };

    // Required Fields
    if (!this.validatorService.validateTaskComplete(task)) {
      this.flashMessagesService.show('Please update task end time', {cssClass: 'alert-danger', timeout: 3000})
    } else {
      this.taskService.completeTask(task)
        .subscribe(val => {
            console.log(val);
            const emitTask: TaskObject = {
              user: val.user,
              name: val.name,
              duration: val.duration,
              start_time: val.start_time,
              end_time: val.end_time
            };
            this.completeTask.emit(emitTask);
            this.name = '';
            this.duration = 0;
            this.start_time = new Date();
            this.end_time = new Date();
            this.name = '';
            this.label = '';
          },
          response => {
            console.log("POST call in error", response);
          });
      if (this.label) {
        this.labelService.addLabel(label).subscribe((val) => {
            console.log("label created: "+val.name);
          },
          response => {
            console.log("POST call in error", response);
          });
      }
    }
  }

  closePopover() {
    this.closePop.emit();
  }

}
