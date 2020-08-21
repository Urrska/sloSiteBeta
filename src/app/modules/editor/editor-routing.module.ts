import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './editor.component';
import {TemplateVocabComponent} from './template-vocab/template-vocab.component';
import {TemplateGrammarComponent} from './template-grammar/template-grammar.component';
import {TemplateGapfillComponent} from './template-gapfill/template-gapfill.component';
import {AuthGuard} from '../../core/guard/auth.guard';
import {AdminGuard} from '../../core/guard/admin.guard';

const editorRoutes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'editor/vocabulary',
    component: TemplateVocabComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'editor/grammar',
    component: TemplateGrammarComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'editor/practice-gapfill',
    component: TemplateGapfillComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(editorRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class EditorRoutingModule {
}
