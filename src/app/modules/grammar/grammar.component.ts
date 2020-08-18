import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../core/services/database-service.service';
import {GrammarLesson} from '../../core/models/grammar-lesson';
import {faArrowAltCircleRight, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss']
})
export class GrammarComponent implements OnInit {

  grammarCollection = [];
  faArrowRight = faLongArrowAltRight;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getCollectionData<GrammarLesson>('grammar')
      .subscribe(res => {
        this.grammarCollection = res;
        console.log(this.grammarCollection);
      });
  }

}
