import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DatabaseService} from '../../core/services/database-service.service';
import {GrammarLesson} from '../../core/models/grammar-lesson';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss']
})
export class GrammarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @ViewChild('cardText') cardText: ElementRef;
  grammarCollection = [];
  faArrowRight = faLongArrowAltRight;

  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    this.subscription = this.db.getCollectionData<GrammarLesson>('grammar')
      .subscribe(res => {
        this.grammarCollection = res;
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
