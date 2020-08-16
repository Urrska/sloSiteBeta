import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth-service.service';
import {faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserEditor = true;
  faCollapsedMenu = faBars;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    // this.isUserEditor = this.authService.isUserEditor;
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
