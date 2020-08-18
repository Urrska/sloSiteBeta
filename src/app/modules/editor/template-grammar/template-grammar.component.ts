import {Component, Input, OnInit} from '@angular/core';
import {GrammarLesson} from '../../../core/models/grammar-lesson';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {DatabaseService} from '../../../core/services/database-service.service';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-template-grammar',
  templateUrl: './template-grammar.component.html',
  styleUrls: ['./template-grammar.component.scss']
})
export class TemplateGrammarComponent implements OnInit {

  @Input() grammarCollection: GrammarLesson;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '10rem',
    width: 'auto',
    translate: 'no',
    placeholder: 'Start editing here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Montserrat, sans-serif',
    defaultFontSize: '5rem',
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarHiddenButtons: [
      ['fontName', 'undo', 'redo', 'subscript', 'superscript', 'insertVideo', 'customClasses', 'toggleEditorMode'],
    ]
  };

  grammarEditorForm: FormGroup;
  faLongArrow = faLongArrowAltLeft;

  constructor(private fb: FormBuilder,
              private db: DatabaseService,
              private router: Router) { }

  ngOnInit() {
    this.initializeGrammarEditorForm();
  }

  initializeGrammarEditorForm() {
    this.grammarEditorForm = this.fb.group({
      grammarTitleSlo: [null, Validators.required],
      grammarTitleEng: [null, Validators.required],
      grammarRichText: [null, Validators.required],
    });
  }

  onSubmit() {
    const rawValues = this.grammarEditorForm.getRawValue();
    this.db.addDocumentToCollection('grammar', rawValues).then(res => {
      this.grammarEditorForm.reset();
      this.router.navigate([`/grammar/${res.id}`]);
    });
  }

  onReset() {
    this.grammarEditorForm.reset();
  }

}
