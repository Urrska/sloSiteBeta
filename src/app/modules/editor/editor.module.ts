import {NgModule} from '@angular/core';
import {EditorComponent} from './editor.component';
import {TemplateGapfillComponent} from './template-gapfill/template-gapfill.component';
import {TemplateGrammarComponent} from './template-grammar/template-grammar.component';
import {TemplateVocabComponent} from './template-vocab/template-vocab.component';
import {InstructionsGapfillComponent} from './template-gapfill/instructions-gapfill/instructions-gapfill.component';
import {EditorRoutingModule} from './editor-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PracticeModule} from '../practice/practice.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {QuillModule} from 'ngx-quill';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    EditorComponent,
    TemplateGapfillComponent,
    TemplateGrammarComponent,
    TemplateVocabComponent,
    InstructionsGapfillComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    EditorRoutingModule,
    SharedModule,
    PracticeModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    NgbDropdownModule,
    NgSelectModule,
    QuillModule.forRoot()
  ],
  providers: []
})
export class EditorModule {
}
