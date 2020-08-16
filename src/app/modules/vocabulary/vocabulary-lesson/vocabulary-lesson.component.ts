import { Component, OnInit } from '@angular/core';
import {VocabularyLesson} from '../../../core/models/vocab-lesson';
import {Subscription} from 'rxjs';

import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import {DatabaseService} from '../../../core/services/database-service.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-vocabulary-lesson',
  templateUrl: './vocabulary-lesson.component.html',
  styleUrls: ['./vocabulary-lesson.component.scss']
})
export class VocabularyLessonComponent implements OnInit {

  faLongArrow = faLongArrowAltLeft;
  vocabularyEntriesSubscription: Subscription;
  lessonsByCategory: VocabularyLesson[] = [];

  constructor(private route: ActivatedRoute,
              private db: DatabaseService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      return this.getVocabularyEntries(params.get('category'));
    });
  }

  getVocabularyEntries(categorySlug: string) {
    if (this.vocabularyEntriesSubscription) {
      this.vocabularyEntriesSubscription.unsubscribe();
    }
    this.vocabularyEntriesSubscription = this.db
      .getVocabularyByCategory(categorySlug)
      .subscribe(vocabularyItems => {
        this.lessonsByCategory = vocabularyItems;
        console.log(this.lessonsByCategory);
      });
  }

}
