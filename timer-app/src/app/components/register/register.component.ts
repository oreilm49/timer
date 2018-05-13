import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,

  ) {
  }

  ngOnInit() {
  }

}
