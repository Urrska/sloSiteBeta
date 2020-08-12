import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HomeModule} from './modules/home/home.module';
import {GrammarModule} from './modules/grammar/grammar.module';
import {PracticeModule} from './modules/practice/practice.module';
import {VocabularyModule} from './modules/vocabulary/vocabulary.module';
import {SharedModule} from './shared/shared.module';
import {EditorModule} from './modules/editor/editor.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AuthComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'slosite'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HomeModule,
    GrammarModule,
    PracticeModule,
    VocabularyModule,
    SharedModule,
    EditorModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
