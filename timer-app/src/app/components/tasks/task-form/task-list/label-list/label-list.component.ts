import {Component, Input, OnInit} from '@angular/core';
import {LabelService} from "../../../../../services/label.service";

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {
  @Input() label: string;

  constructor(private labelService: LabelService) { }

  ngOnInit() {

  }



}
