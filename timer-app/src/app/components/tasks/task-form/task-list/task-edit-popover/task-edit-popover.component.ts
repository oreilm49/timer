import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {taskLabels, TaskObject} from "../../../../../objects";
import {TaskService} from "../../../../../services/task.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {LabelService} from "../../../../../services/label.service";
import {NgbPopoverConfig} from "@ng-bootstrap/ng-bootstrap";
import {ValidatorService} from "../../../../../services/validator.service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-task-edit-popover',
  templateUrl: './task-edit-popover.component.html',
  styleUrls: ['./task-edit-popover.component.css']
})
export class TaskEditPopoverComponent implements OnInit {
  @Input() activeTask: TaskObject;
  @Input() index;
  @Output() editedTask = new EventEmitter<TaskObject>();
  @Output() editedTaskIndex = new EventEmitter<number>();
  @Output() closePop = new EventEmitter();
  labels: taskLabels[];

  // task form variables
  userId: string;
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
    public afAuth: AngularFireAuth,
    config: NgbPopoverConfig
  ) {
    config.container = 'body';
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in: '+res.uid);
        this.userId = res.uid;
      } else {
        console.log('user not logged in');
      }
    });
  }

  taskUpdate() {
    if (!this.id == undefined) {
      this.id = this.activeTask._id;
    }
    if (this.name == undefined) {
      this.name = this.activeTask.name;
    }
    if (!this.duration) {
      this.duration = this.activeTask.duration;
    }
    if (!this.start_time) {
      this.start_time = this.activeTask.start_time;
    }
    if (this.end_time == undefined && this.activeTask.end_time !== undefined) {
      this.end_time = this.activeTask.end_time;
    }

    const task: TaskObject = {
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
            this.editedTask.emit(val);
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

  taskFinished() {
  }

}
