import {Component, OnInit, Input, ViewChild, ElementRef, OnChanges} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import * as _ from 'lodash';
import * as Plotly from 'plotly.js';
import {Config, Data, Layout} from 'plotly.js';
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'app-dash-charts',
  templateUrl: './dash-charts.component.html',
  styleUrls: ['./dash-charts.component.css']
})
export class DashChartsComponent implements OnInit, OnChanges{
  @ViewChild('timeChart') el: ElementRef;
  @ViewChild('tasksChart') el2: ElementRef;
  @Input() time: string;
  userId: string;

  public timeByLabelData: number[] = [];
  public tasksByLabelData: number[] = [];
  public timeByLabelLabels: string[] = [];

  constructor(
    private dashService: DashboardService,
    public afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.getChartData(this.time);
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in: '+res.uid);
        this.userId = res.uid;
      } else {
        console.log('user not logged in');
      }
    });
  }

  ngOnChanges(){
    this.timeByLabelData = [];
    this.tasksByLabelData = [];
    this.timeByLabelLabels = [];
    this.getChartData(this.time);
  }

  getChartData(period) {
    this.dashService.getTaskData(period)
      .subscribe(
        value => {
          for(let i = 0; i< value.length;i++) {
            this.timeByLabelData.push(value[i].value.total);
            this.tasksByLabelData.push(value[i].value.count);
            this.timeByLabelLabels.push(value[i].key);
          }
          this.timeChart();
          this.taskChart();
        },
        error2 => {
          console.log("Error receiving task data: "+error2)
        }
      )
  }

  timeChart() {
    const element = this.el.nativeElement;
    const data: any[] = [{
      values: this.timeByLabelData,
      labels: this.timeByLabelLabels,
      hole: .5,
      type: 'pie',
    }];
    const layout = {
      title: "Time Spent / Label (minutes)",
      height: 400,
      width: 400,
      paper_bgcolor: "#f3f3f3"
    };
    Plotly.plot(element, data ,layout, {displayModeBar: false});
  }
  taskChart() {
    const element = this.el2.nativeElement;
    const data: any[] = [{
      values: this.tasksByLabelData,
      labels: this.timeByLabelLabels,
      type: 'pie',
      hole: .5
    }];
    const layout = {
      title: "# Tasks / Label",
      height: 400,
      width: 400,
      paper_bgcolor: "#f3f3f3"
    };
    Plotly.plot(element, data ,layout,{displayModeBar: false});
  }
}
