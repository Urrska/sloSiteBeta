import {Component, OnInit} from '@angular/core';
import {faEnvelope, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  modeEnum = AccountMode;
  mode: AccountMode = AccountMode.Login;
  faEmail = faEnvelope;
  faPassword = faLock;
  faEye = faEye;
  faEyeCrossed = faEyeSlash;

  accountForm: FormGroup;
  isPasswordShown = false;
  resetEmail: string;

  constructor(private fb: FormBuilder,
              public router: Router,
              public auth: AuthService) {
  }

  ngOnInit() {

    this.initializeAccountForm();

    if (this.router.url.includes('login')) {
      this.mode = AccountMode.Login;
    } else if (this.router.url.includes('register')) {
      this.mode = AccountMode.Register;
    } else if (this.router.url.includes('forgotten-password')) {
      this.mode = AccountMode.ForgotPassword;
    } else if (this.router.url.includes('verify-email')) {
      this.mode = AccountMode.VerifyEmail;
    }
  }

  get accountMode() {
    if (this.mode === AccountMode.Login) {
      return 'Login';
    } else if (this.mode === AccountMode.Register) {
      return 'Register';
    } else if (this.mode === AccountMode.ForgotPassword) {
      return 'Reset Password';
    } else if (this.mode === AccountMode.VerifyEmail) {
      return 'Verify Email';
    }
  }

  initializeAccountForm() {
    this.accountForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  showPassword() {
    this.isPasswordShown = this.isPasswordShown === false;
  }

  resetPassword(resetEmail) {
    this.auth.sendPasswordResetEmail(resetEmail);
  }

  verifyEmail() {
    this.auth.verifyEmail();
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const rawValues = this.accountForm.getRawValue();
      const email = rawValues.email;
      const password = rawValues.password;
      if (this.mode === AccountMode.Login) {
        this.auth.login(email, password);
      } else if (this.mode === AccountMode.Register) {
        this.auth.register(email, password);
      }
    }
  }

}

export enum AccountMode {
  Login,
  Register,
  ForgotPassword,
  VerifyEmail
}
