import {Component, OnInit} from '@angular/core';
import {faEnvelope, faEye, faEyeSlash, faLock} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faEmail = faEnvelope;
  faPassword = faLock;
  faEye = faEye;
  faEyeCrossed = faEyeSlash;

  isPasswordShown = false;

  registerForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  showPassword() {
    this.isPasswordShown = this.isPasswordShown === false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const rawValues = this.registerForm.getRawValue();
      const email = rawValues.email;
      const password = rawValues.password;
      this.authService.register(email, password);
    } else {
      console.log('Something went wrong!');
    }
  }


}
