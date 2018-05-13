import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {TaskObject} from "../../../../objects";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {
  @Input() completedTask: TaskObject;
  @Output() removeCompletedTask = new EventEmitter<TaskObject>();
  @ViewChild('taskId') taskId;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  deleteTask() {
    this.taskService.deleteTaskById(this.taskId.nativeElement.textContent)
      .subscribe(
        val => {
          console.log(val);
          this.removeCompletedTask.emit(val);
        },
        response => {
          console.log("POST call in error", response);
        });
  }

}
