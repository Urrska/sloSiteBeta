import { Component, OnInit } from '@angular/core';
import {VocabularyCategory} from '../../core/models/vocab-lesson';
import {DatabaseService} from '../../core/services/database-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

  vocabCategory: VocabularyCategory[];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.getVocabCategories();
  }

  getVocabCategories() {
    this.db.getCollectionData<VocabularyCategory>('vocab-category')
      .subscribe(category => {
        this.vocabCategory = category;
      });
  }

}
