import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {values} from "d3-collection";
import {CountDuration, TaskData} from "../../objects";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  timeFrameSelect: string;
  completedTasks: TaskData[];
  avgTimePerTask: number;

  constructor(private dashService: DashboardService) { }

  ngOnInit() {
    this.completedTasks = [];
    this.avgTimePerTask = 0;
    this.timeFrameSelect = 'day';
    this.getCompletedTasks(this.timeFrameSelect);
    this.getAvgTime(this.timeFrameSelect);
  }
  passChartData(period) {
    this.timeFrameSelect = period;
  }
  getCompletedTasks(period) {
    this.dashService.getCompletedData(period)
      .subscribe(
        value => {this.completedTasks = value as any},
        error => console.log('error loading task data - getCompletedTasks: '+error)
      )
  }
  getAvgTime(period) {
    this.dashService.getCountDurationData(period)
      .subscribe(
        value => this.avgTimePerTask = value.duration/value.count,
        error => console.log('error loading avg time - getCountDurationData: '+error)
      )
  }


}
