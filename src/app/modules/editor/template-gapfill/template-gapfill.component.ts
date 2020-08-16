import {Component, OnInit} from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PracticeGapfill} from '../../../core/models/practice-gapfill';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../core/services/database-service.service';

@Component({
  selector: 'app-template-gapfill',
  templateUrl: './template-gapfill.component.html',
  styleUrls: ['./template-gapfill.component.scss']
})
export class TemplateGapfillComponent implements OnInit {
  gapfillTemplateForm: FormGroup;

  faPlus = faPlusCircle;
  faInstructions = faQuestionCircle;
  documentId: string;
  formPreview: PracticeGapfill;

  constructor(private fb: FormBuilder,
              private router: Router,
              private db: DatabaseService,
              public smartModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.gapfillTemplateForm = this.fb.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      gapfills: this.fb.array([
        this.fb.array([
          this.fb.group({
            value: [null],
            expectedValue: [null],
            type: ['text']
          })
        ])
      ])
    });
  }

  getGapfillControls() {
    return (this.gapfillTemplateForm.get('gapfills') as FormArray).controls;
  }

  getSentenceControls(gapfill) {
    return (gapfill as FormArray).controls;
  }

  delimitInput(event, gapfill, j) {
    // create new FG with appropriate (empty) values
    (gapfill as FormArray).insert(j + 1, this.fb.group({
      value: [null],
      type: [this.setDelimitedInputType(gapfill, j)],
      expectedValue: [null],
    }));
    // change the placement of the cursor indicator
    setTimeout(() => {
      event.target.parentElement.nextElementSibling.lastElementChild.focus();
    }, 100);
  }

  setDelimitedInputType(gapfill, index) {
    const controls = ((gapfill as FormArray).at(index) as FormGroup).controls;
    return controls.type.value === 'text' ? 'textBox' : 'text';
  }

  // ctrl + enter
  toggleInputType(gapfill, j) {
    const controls = ((gapfill as FormArray).at(j) as FormGroup).controls;
    if (controls.type.value === 'text') {
      controls.type.setValue('textBox');
      controls.expectedValue.setValue(controls.value.value);
      controls.value.setValue(null);
      return controls.type.value.toUpperCase();
    } else {
      controls.type.setValue('text');
      controls.value.setValue(controls.expectedValue.value);
      controls.expectedValue.setValue(null);
      return controls.type.value.toUpperCase();
    }
  }

  toggleLabelName(gapfill, j) {
    const controls = ((gapfill as FormArray).at(j) as FormGroup).controls;
    return controls.type.value.toUpperCase();
  }

  toggleControlName(gapfill, j): string {
    const controls = ((gapfill as FormArray).at(j) as FormGroup).controls;
    return controls.type.value === 'textBox' ? 'expectedValue' : 'value';
  }

  generateNewLine() {
    (this.gapfillTemplateForm.get('gapfills') as FormArray).push(this.fb.array([
      this.fb.group({
        value: [null],
        type: ['text'],
        expectedValue: [null]
      })
    ]));
  }

  onSubmit() {
    const rawValues = this.gapfillTemplateForm.getRawValue();
    const gapfillPractice = {
      title: rawValues.title,
      image: rawValues.image,
      gapfills: rawValues.gapfills.map(sentence => ({sentence}))
    };
    this.db.addDocumentToCollection<PracticeGapfill[]>('practice-gapfill', gapfillPractice).then(res => {
      this.router.navigate([`/practice/${res.id}`]);
    });
  }

  onReset() {
    this.gapfillTemplateForm.reset();
  }

  openModal() {
    const rawValues = this.gapfillTemplateForm.getRawValue();
    this.formPreview = {
      title: rawValues.title,
      image: rawValues.image,
      gapfills: rawValues.gapfills.map(sentence => ({sentence}))
    };

    // TODO change the id
    this.smartModalService.open('exercise-individual-preview');
  }

}
