import {Component, OnDestroy, OnInit} from '@angular/core';
import {VocabularyCategory} from '../../core/models/vocab-lesson';
import {DatabaseService} from '../../core/services/database-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  vocabCategory: VocabularyCategory[];

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.getVocabCategories();
  }

  getVocabCategories() {
   this.subscription = this.db.getCollectionData<VocabularyCategory>('vocab-category')
      .subscribe(category => {
        this.vocabCategory = category;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
