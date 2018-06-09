import {Component, OnInit, Input, ElementRef, Output, ViewChild, Renderer2, EventEmitter, ViewEncapsulation} from '@angular/core';
import {taskLabels, TaskObject} from "../../../../objects";
import {TaskService} from "../../../../services/task.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LabelService} from "../../../../services/label.service";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent implements OnInit {
  @Input() listItem: TaskObject;
  @ViewChild('taskId') taskId:ElementRef;
  @ViewChild('taskIndex') taskIndex:ElementRef;
  @Output() removeTask = new EventEmitter<TaskObject>();
  @Output() completeTaskEmit = new EventEmitter<TaskObject>();
  @Output() editTask = new EventEmitter<TaskObject>();
  @Output() removeTaskIndex = new EventEmitter<number>();
  @Output() toComplete = new EventEmitter<TaskObject>();

  labels: taskLabels[];

  day: Date;
  month: Date;

  constructor(
    private taskService: TaskService,
    private rd: Renderer2,
    private modalService: NgbModal,
    private labelService: LabelService
            ) {
  }

  ngOnInit() {
    this.getTaskLabels(this.listItem._id)
  }

  deleteTask() {
    this.taskService.deleteTaskById(this.taskId.nativeElement.textContent)
      .subscribe(
        val => {
          this.completeTaskEmit.emit(val);
        },
        response => {
          console.log("POST call in error", response);
        });
  }

  emitComplete(task) {
    this.removeTask.emit(task)
  }

  emitEdit(task) {
    let date=task.start_time;
    let newDate = date.month+"/"+date.day+"/"+date.year;
    let newDateNumber = new Date(newDate).getTime();

    this.listItem.start_time = newDateNumber;
    this.listItem.name = task.name;
    this.listItem._id = task.id;
    this.listItem.duration = task.duration;
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  getTaskLabels(task) {
    this.labelService.labelsByTask(task)
      .subscribe(value => {
          this.labels = value
        },
        error => {
          console.log('error getting labels: '+error)
        })
  }

}
