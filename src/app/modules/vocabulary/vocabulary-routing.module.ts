import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VocabularyComponent} from './vocabulary.component';
// import {AuthGuard} from '../../core/guard/auth.guard';
import {VocabularyLessonComponent} from './vocabulary-lesson/vocabulary-lesson.component';


const vocabularyRoutes: Routes = [
  {
    // seznam vseh vaj
    path: 'vocabulary',
    component: VocabularyComponent,
    // canActivate: [AuthGuard]
  },
  {
    // posamezna vaja
    path: 'vocabulary/:category',
    component: VocabularyLessonComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(vocabularyRoutes)
  ],
  exports: [RouterModule]
})
export class VocabularyRoutingModule {
}


