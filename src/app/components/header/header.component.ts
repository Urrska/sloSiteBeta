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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isUserAdmin();
  }

  isUserAdmin() {
    this.authService.user.subscribe(res => {
      this.isAdmin = res.role.admin;
    });
  }

  logout() {
    this.authService.logout();
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
