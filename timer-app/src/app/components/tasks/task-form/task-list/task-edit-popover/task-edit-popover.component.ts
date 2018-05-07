import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompletedTask, TaskObject} from "../../../../../objects";
import {TaskService} from "../../../../../services/task.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {LabelService} from "../../../../../services/label.service";
import {NgbPopoverConfig} from "@ng-bootstrap/ng-bootstrap";
import {ValidatorService} from "../../../../../services/validator.service";

@Component({
  selector: 'app-task-edit-popover',
  templateUrl: './task-edit-popover.component.html',
  styleUrls: ['./task-edit-popover.component.css']
})
export class TaskEditPopoverComponent implements OnInit {
  @Input() activeTask: CompletedTask;
  @Input() index;
  @Output() editedTask = new EventEmitter<TaskObject>();
  @Output() editedTaskIndex = new EventEmitter<number>();
  @Output() closePop = new EventEmitter();

  // task form variables
  userId: '1';
  id: string;
  name: string;
  duration: number;
  start_time: number;
  label: string;
  end_time: number;

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

  taskUpdate() {
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

    // Required Fields

      this.taskService.completeTask(task)
        .subscribe(val => {
            console.log("Task created: "+val);
            this.editedTask.emit(task);
            this.closePop.emit();
            this.name = '';
            this.duration = 0;
            this.start_time = 0;
            this.end_time = 0;
            this.name = '';
            this.label = '';
          },
          response => {
            console.log("POST call in error", response);
          });


  }
}
