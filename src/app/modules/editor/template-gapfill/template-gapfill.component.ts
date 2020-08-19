import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PracticeGapfill} from '../../../core/models/practice-gapfill';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../core/services/database-service.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion';

@Component({
  selector: 'app-template-gapfill',
  templateUrl: './template-gapfill.component.html',
  styleUrls: ['./template-gapfill.component.scss']
})
export class TemplateGapfillComponent implements OnInit {

  gapfillTemplateForm: FormGroup;
  faPlus = faPlus;
  faInstructions = faQuestion;
  formPreview: FormGroup;
  docPreview: PracticeGapfill;

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
            type: ['T']
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

  // enter
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

  resizeInputLength(event) {
    event.target.style.width = (event.target.value.length + 2) + 'ch';
  }

  setDelimitedInputType(gapfill, index) {
    const controls = ((gapfill as FormArray).at(index) as FormGroup).controls;
    return controls.type.value === 'T' ? 'B' : 'T';
  }

  // ctrl + enter - switches the value of the input
  toggleInputType(gapfill, j) {
    const controls = ((gapfill as FormArray).at(j) as FormGroup).controls;
    if (controls.type.value === 'T') {
      controls.type.setValue('B');
      controls.expectedValue.setValue(controls.value.value);
      controls.value.setValue(null);
      return controls.type.value.toUpperCase();
    } else {
      controls.type.setValue('T');
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
    return controls.type.value === 'B' ? 'expectedValue' : 'value';
  }

  generateNewLine(event) {
    (this.gapfillTemplateForm.get('gapfills') as FormArray).push(this.fb.array([
      this.fb.group({
        value: [null],
        type: ['T'],
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
    this.docPreview = new PracticeGapfill({
      title: rawValues.title,
      image: rawValues.image,
      gapfills: rawValues.gapfills.map(sentence => ({sentence}))
    });

    this.formPreview = this.fb.group({
      gapfills: this.fb.array(
        this.docPreview.gapfills.map(gaps => this.fb.array(
          gaps.sentence
            .map(sentencePart => {
              if (sentencePart.type === 'B') {
                return this.fb.control
                (null, [Validators.required, Validators.pattern(`(?:^|\W)${sentencePart.expectedValue}(?:$|\W)`)]);
              } else {
                return this.fb.control(sentencePart.value);
              }
            })
          )
        )
      )
    });
    this.smartModalService.open('preview-gapfill');
  }
}

