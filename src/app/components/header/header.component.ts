import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserEditor = true;

  constructor() {
  }

  ngOnInit() {
    // this.isUserEditor = this.authService.isUserEditor;
  }

  // logout() {
  //   this.authService.logout().then();
  // }
  //
  // // is this method necessary, could it be inserted directly into the template?
  // isUserLoggedIn() {
  //   return this.authService.isLoggedIn;
  // }

}
