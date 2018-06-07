import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import * as firebase from 'firebase/app'
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  photo: string;
  userId: string;
  authenticated: boolean = false;

  constructor(
    public af: AngularFireAuth,
    public afAuth: AngularFireAuth
    ) {
    this.af.authState.subscribe(
      (auth) => {
        if(auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in: '+res.uid);
        this.photo = res.photoURL;
        this.userId = res.uid;
      } else {
        console.log('user not logged in');
      }
    });
  }

  logout() {
    console.log('logout');
    this.af.auth.signOut()
      .then((result)=>{
          window.location.reload();
          this.authenticated = false;
        console.log('You were logged out successfully!');
      }).catch((error) =>{
      this.authenticated = true;
      console.log('Error signing out: ',error);
    })
  }
}
