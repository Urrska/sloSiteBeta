import { Component, OnInit } from '@angular/core';
import {GrammarLesson} from '../../../core/models/grammar-lesson';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import {ActivatedRoute} from '@angular/router';
import { DatabaseService } from 'src/app/core/services/database-service.service';


@Component({
  selector: 'app-grammar-lesson',
  templateUrl: './grammar-lesson.component.html',
  styleUrls: ['./grammar-lesson.component.scss']
})
export class GrammarLessonComponent implements OnInit {

  grammarLesson: GrammarLesson;
  faLongArrow = faLongArrowAltLeft;
  isReady = false;

  constructor(private db: DatabaseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const docId = this.route.snapshot.params.lesson;
    this.db.getDocument('grammar', docId).then(data => {
        this.grammarLesson = new GrammarLesson(data.data());
        this.isReady = true;
      }
    );
  }

}
