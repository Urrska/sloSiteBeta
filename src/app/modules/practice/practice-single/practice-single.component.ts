import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PracticeGapfill} from '../../../core/models/practice-gapfill';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import {DatabaseService} from '../../../core/services/database-service.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-practice-single',
  templateUrl: './practice-single.component.html',
  styleUrls: ['./practice-single.component.scss']
})
export class PracticeSingleComponent implements OnInit {

  faLongArrow = faLongArrowAltLeft;

  gapfillForm: FormGroup;

  isDataReady = false;
  hasInputValue = false;
  isReadyForValidation = false;
  isSolutionShown = false;

  gapfillDoc: PracticeGapfill;

  constructor(private fb: FormBuilder,
              private db: DatabaseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const docId = this.route.snapshot.params.id;
    this.db.getDocument<PracticeGapfill>('practice-gapfill', docId).then(document => {
      this.gapfillDoc = new PracticeGapfill(document.data());
      this.initializeForm();
    });
  }


  initializeForm() {
    this.gapfillForm = this.fb.group({
      gapfills: this.fb.array(
        this.gapfillDoc.gapfills.map(gaps => this.fb.array(
          gaps.sentence
            .map(sentencePart => {
              if (sentencePart.type === 'textBox') {
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
    this.isDataReady = true;

    this.gapfillForm.valueChanges.subscribe(() => {
      this.toggleDisabledButton();
    });
  }

  getSentenceParts(data) {
    const sentenceFull = [];
    data.sentence.forEach(sentencePart => {
      sentencePart.value !== null ? sentenceFull.push(sentencePart.value) : sentenceFull.push(sentencePart.expectedValue);
    });
    return sentenceFull.join(' ');
  }

  toggleDisabledButton() {
    const checkableInputs = [];
    (this.gapfillForm.get('gapfills') as FormArray).controls
      .forEach((sentence: FormArray) => sentence.controls
        .forEach((sentencePart: FormControl) => {
          // tslint:disable-next-line:no-unused-expression
          sentencePart.validator !== null ? checkableInputs.push(sentencePart) : checkableInputs;
        }));
    return checkableInputs.some(input => !input.dirty) ? this.hasInputValue = false : this.hasInputValue = true;
  }

  onSubmit() {
    this.isReadyForValidation = true;
  }

  onReset() {
    this.gapfillForm.reset();
    this.isReadyForValidation = false;
    this.isSolutionShown = false;
    this.hasInputValue = false;
  }

  toggleSolutionDisplay() {
    this.isSolutionShown = !this.isSolutionShown;
  }

}
