import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Renderer2} from "@angular/core";
import {LabelService} from "../../../../services/label.service";
import {NewLabelObject, LabelObject, ReturnedLabelObject, CreateLabelObject} from "../../../../objects";
import {AngularFireAuth} from "angularfire2/auth";

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
  userId: string;

  constructor(config: NgbDropdownConfig,
              public renderer: Renderer2,
              private labelService: LabelService,
              public afAuth: AngularFireAuth
              ) {
    config.placement = 'bottom';
    config.autoClose = false;
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in: '+res.uid);
        this.userId = res.uid;
      } else {
        console.log('user not logged in');
      }
    });
  }

  onNewLabel(event) {
    if(event.keyCode == 13) {
      const label: CreateLabelObject = {
        name: this.labelName,
        user: this.userId,
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
