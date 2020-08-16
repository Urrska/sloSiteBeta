import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetEmail: string;

  constructor(private  authService: AuthService) {
  }

  ngOnInit() {
  }

  resetPassword(resetEmail) {
    this.authService.sendPasswordResetEmail(resetEmail);
  }
}
