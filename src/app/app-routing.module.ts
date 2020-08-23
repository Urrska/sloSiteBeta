import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailVerificationComponent} from './components/auth/email-verification/email-verification.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {AuthComponent} from './components/auth/auth.component';
import {AuthGuard} from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgotten-password', component: ForgotPasswordComponent},
      {path: 'email-verification', component: EmailVerificationComponent},
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
