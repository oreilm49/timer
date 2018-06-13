import {Component, Input, OnInit} from '@angular/core';
import {LabelService} from "../../../../../services/label.service";
import {taskLabels} from "../../../../../objects";

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {
  @Input() label: string;
  @Input() extra_labels: number;
  @Input() task: string;
  labels: taskLabels[];

  constructor(private labelService: LabelService) { }

  ngOnInit() {

  }

  getTaskLabels(task: string) {
      this.labelService.labelsByTask(task)
        .subscribe(labels =>{
          this.labels = labels;
          console.log(`${labels.length} labels received`)
        },
          error => {
          console.log(`error fetching labels: ${error}`)
          })
  }

}
