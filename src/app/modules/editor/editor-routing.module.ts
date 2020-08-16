import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './editor.component';
import {TemplateVocabComponent} from './template-vocab/template-vocab.component';
import {TemplateGrammarComponent} from './template-grammar/template-grammar.component';
import {TemplateGapfillComponent} from './template-gapfill/template-gapfill.component';
import {AuthGuard} from '../../core/guard/auth.guard';


const editorRoutes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]

  },
  {
    path: 'editor/vocabulary',
    component: TemplateVocabComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]

  },
  {
    path: 'editor/grammar',
    component: TemplateGrammarComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]

  },
  {
    path: 'editor/practice-gapfill',
    component: TemplateGapfillComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(editorRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class EditorRoutingModule {
}
