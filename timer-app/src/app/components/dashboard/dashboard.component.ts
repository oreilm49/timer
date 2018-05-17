import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {values} from "d3-collection";
import {CountDuration, TaskData} from "../../objects";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: string;
  timeFrameSelect: string;
  completedTasks: TaskData[];
  avgTimePerTask: number;

  constructor(
    private dashService: DashboardService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.completedTasks = [];
    this.avgTimePerTask = 0;
    this.timeFrameSelect = 'day';

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.getCompletedTasks(this.timeFrameSelect, res.uid);
        this.getAvgTime(this.timeFrameSelect, res.uid);
      } else {
        console.log('user not logged in');
      }
    });
  }

  passChartData(period) {
    this.timeFrameSelect = period;
  }
  getCompletedTasks(period, user) {
    this.dashService.getCompletedData(period, user)
      .subscribe(
        value => {this.completedTasks = value as any},
        error => console.log('error loading task data - getCompletedTasks: '+error)
      )
  }
  getAvgTime(period, user) {
    this.dashService.getCountDurationData(period, user)
      .subscribe(
        value => this.avgTimePerTask = value.duration/value.count,
        error => console.log('error loading avg time - getCountDurationData: '+error)
      )
  }


}
