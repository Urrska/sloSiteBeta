import {Component, OnInit} from '@angular/core';
import {faEnvelope, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faEmail = faEnvelope;
  faPassword = faLock;
  faEye = faEye;
  faEyeCrossed = faEyeSlash;

  loginForm: FormGroup;
  isPasswordShown = false;

  constructor(private fb: FormBuilder,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  showPassword() {
    this.isPasswordShown = this.isPasswordShown === false;
  }

  onSubmit() {
    const rawValues = this.loginForm.getRawValue();
    const email = rawValues.email;
    const password = rawValues.password;
    this.auth.login(email, password);
  }

}
