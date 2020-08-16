import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkUrlParams() {
    return !(window.location.href.includes('forgotten-password') || window.location.href.includes('email-verification'));
  }

}
