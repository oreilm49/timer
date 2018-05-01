import {Component, OnInit, Input, ElementRef, Output, ViewChild, Renderer2, EventEmitter} from '@angular/core';
import {TaskObject} from "../../../../objects";
import {TaskService} from "../../../../services/task.service";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent implements OnInit {
  @Input() listItem: TaskObject[];
  @ViewChild('taskId') taskId:ElementRef;
  @Output() removeTask = new EventEmitter<TaskObject>();
  @Output() toComplete = new EventEmitter<TaskObject>();

  constructor(
    private taskService: TaskService,
    private rd: Renderer2
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

}
