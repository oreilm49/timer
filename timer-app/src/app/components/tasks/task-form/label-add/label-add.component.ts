import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Renderer2} from "@angular/core";
import {LabelService} from "../../../../services/label.service";
import {NewLabelObject, LabelObject, ReturnedLabelObject} from "../../../../objects";

@Component({
  selector: 'app-label-add',
  templateUrl: './label-add.component.html',
  styleUrls: ['./label-add.component.css'],
  providers: [NgbDropdownConfig]
})
export class LabelAddComponent implements OnInit {
  @ViewChild('labelDrop') labelDrop;
  @Output() createdLabel = new EventEmitter<ReturnedLabelObject>();

  labelName: string;
  user: string = '1';

  constructor(config: NgbDropdownConfig,
              public renderer: Renderer2,
              private labelService: LabelService
              ) {
    config.placement = 'bottom';
    config.autoClose = false;
  }

  ngOnInit() {
  }

  onNewLabel(event) {
    if(event.keyCode == 13) {
      const label: NewLabelObject = {
        name: this.labelName,
        user: this.user,
      };
      console.log('new label created: '+ this.labelName);
      this.labelDrop.close();
      this.labelService.createLabel(label)
        .subscribe(val => {
            this.createdLabel.emit(val);
          },
          response => {
            console.log("POST call in error", response);
          });
    }
  }

}
