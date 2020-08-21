import {Component, Input, OnInit} from '@angular/core';
import {GrammarLesson} from '../../../core/models/grammar-lesson';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../core/services/database-service.service';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-template-grammar',
  templateUrl: './template-grammar.component.html',
  styleUrls: ['./template-grammar.component.scss']
})
export class TemplateGrammarComponent implements OnInit {

  @Input() grammarCollection: GrammarLesson;

  grammarEditorForm: FormGroup;
  faLongArrow = faLongArrowAltLeft;

  editorStyles = {
    height: '28rem'
  };

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{indent: '-1'}, {indent: '+1'}],
      [{size: ['small', false, 'large', 'huge']}],
      [{color: []}, {background: []}],
      [{align: []}],
      ['clean'],
      ['link', 'image']
    ]
  };

  constructor(private fb: FormBuilder,
              private db: DatabaseService,
              private router: Router) {
  }

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
