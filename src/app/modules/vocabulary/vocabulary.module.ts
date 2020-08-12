import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VocabularyComponent} from './vocabulary.component';
import {VocabularyLessonComponent} from './vocabulary-lesson/vocabulary-lesson.component';
import {VocabularyRoutingModule} from './vocabulary-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    VocabularyComponent,
    VocabularyLessonComponent
  ],
  imports: [
    VocabularyRoutingModule,
    SharedModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    VocabularyComponent,
    VocabularyLessonComponent
  ],
  providers: []
})
export class VocabularyModule {
}
