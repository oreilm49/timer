import { Component, OnInit } from '@angular/core';
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
  authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    public af: AngularFireAuth,
    private router: Router
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
  }
  authLogout() {
    this.authService.logout()
  }

  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result)=>{
        this.authenticated = true;
        console.log('Signed in successfully!');
      }).catch((error)=>{
      this.authenticated = false;
      console.log('Error signing in: ',error);
    })
  }

  logout() {
    console.log('logout');
    this.af.auth.signOut()
      .then((result)=>{
        this.router.navigate(['']).then(function(){
          window.location.reload();
          this.authenticated = false;
        });
        console.log('You were logged out successfully!');
      }).catch((error) =>{
      this.authenticated = true;
      console.log('Error signing out: ',error);
    })
  }

}
