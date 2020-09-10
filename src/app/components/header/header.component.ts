import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth-service.service';
import {faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faCollapsedMenu = faBars;
  isAdmin: boolean;
  navbarOpen = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.isUserAdmin();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isUserAdmin() {
    this.authService.user.subscribe(res => {
      if (res) {
        return this.isAdmin = res.role.admin;
      } else {
        return;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
