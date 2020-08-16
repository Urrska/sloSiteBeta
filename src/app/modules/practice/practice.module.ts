import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeComponent } from './practice.component';
import {PracticeRoutingModule} from './practice-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PracticeSingleComponent} from './practice-single/practice-single.component';



@NgModule({
  declarations: [
    PracticeSingleComponent,
    PracticeComponent
  ],
  imports: [
    CommonModule,
    PracticeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    PracticeComponent,
    PracticeSingleComponent
  ]
})
export class PracticeModule { }
