import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  isEditorShown = false;
  isGapfillClicked = false;
  isVocabClicked = false;
  isGrammarClicked = false;

  constructor() { }

  ngOnInit() {
  }

  showVocabTemplate() {
    this.isVocabClicked = !this.isVocabClicked;
    this.isEditorShown = !this.isEditorShown;
  }

  showGrammarTemplate() {
    this.isGrammarClicked = !this.isGrammarClicked;
    this.isEditorShown = !this.isEditorShown;
  }

  showGapfillTemplate() {
    this.isGapfillClicked = !this.isGapfillClicked;
    this.isEditorShown = !this.isEditorShown;
  }

  toggleMultipleChoice() {
    console.log('multiple choice');
  }

  toggleWordOrder() {
    console.log('word order');
  }

  toggleInputAnswer() {
    console.log('input answer');
  }


}
