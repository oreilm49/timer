import {Component, OnInit, Input, ElementRef, Output, ViewChild, Renderer2, EventEmitter, ViewEncapsulation} from '@angular/core';
import {TaskObject} from "../../../../objects";
import {TaskService} from "../../../../services/task.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  @Output() editTask = new EventEmitter<TaskObject>();
  @Output() removeTaskIndex = new EventEmitter<number>();
  @Output() toComplete = new EventEmitter<TaskObject>();

  day: Date;
  month: Date;

  constructor(
    private taskService: TaskService,
    private rd: Renderer2,
    private modalService: NgbModal
            ) {
  }

  ngOnInit() {

  }

  deleteTask() {
    this.taskService.deleteTaskById(this.taskId.nativeElement.textContent)
      .subscribe(
        val => {
          this.removeTask.emit(val);
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

}
