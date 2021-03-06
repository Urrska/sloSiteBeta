import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HomeModule} from './modules/home/home.module';
import {GrammarModule} from './modules/grammar/grammar.module';
import {PracticeModule} from './modules/practice/practice.module';
import {VocabularyModule} from './modules/vocabulary/vocabulary.module';
import {SharedModule} from './shared/shared.module';
import {EditorModule} from './modules/editor/editor.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {AdjustInputStyleDirective} from './shared/directives/adjust-input-style.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,
    AdjustInputStyleDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'sloSiteBeta'),
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
    RouterModule,
    AppRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
