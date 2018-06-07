import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: boolean = false;

  constructor(
    public af: AngularFireAuth,
  ) {
    this.af.authState.subscribe(
      (auth) => {
        if(auth != null) {
          this.authenticated = true;
        }
      });
  }

  ngOnInit() {
  }

}
