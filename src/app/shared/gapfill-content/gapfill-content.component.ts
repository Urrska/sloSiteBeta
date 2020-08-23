import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {PracticeGapfill} from '../../core/models/practice-gapfill';

@Component({
  selector: 'app-gapfill-content',
  templateUrl: './gapfill-content.component.html',
  styleUrls: ['./gapfill-content.component.scss']
})
export class GapfillContentComponent implements OnInit {

  @Input() gapfillForm: FormGroup;
  @Input() gapfillDoc: PracticeGapfill;

  hasInputValue = false;
  isReadyForValidation = false;
  isSolutionShown = false;
  solutionButtonValue = 'Show solutions';

  constructor() { }

  ngOnInit() {
    this.gapfillForm.valueChanges.subscribe(() => this.toggleDisabledButton());
  }

  resizeInputLength(event) {
    event.target.style.width = (event.target.value.length + 2 ) + 'ch';
  }

  getSentenceParts(data) {
    const sentenceFull = [];
    data.sentence.forEach(sentencePart => {
      sentencePart.value !== null ? sentenceFull.push(sentencePart.value) : sentenceFull.push(sentencePart.expectedValue);
    });
    return sentenceFull.join(' ');
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
    if (this.isSolutionShown) {
      this.solutionButtonValue = 'Hide solutions';
    } else {
      this.solutionButtonValue = 'Show solutions';
    }
    return this.solutionButtonValue;
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

}
