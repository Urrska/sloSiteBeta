import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarComponent } from './grammar.component';
import { GrammarLessonComponent } from './grammar-lesson/grammar-lesson.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GrammarRoutingModule} from './grammar-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {QuillModule} from 'ngx-quill';



@NgModule({
  declarations: [GrammarComponent, GrammarLessonComponent],
    imports: [
        GrammarRoutingModule,
        SharedModule,
        CommonModule,
        FontAwesomeModule,
        QuillModule
    ]
})
export class GrammarModule { }
