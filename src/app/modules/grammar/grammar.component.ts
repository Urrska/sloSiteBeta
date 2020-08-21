import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DatabaseService} from '../../core/services/database-service.service';
import {GrammarLesson} from '../../core/models/grammar-lesson';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrls: ['./grammar.component.scss']
})
export class GrammarComponent implements OnInit, AfterViewInit {

  @ViewChild('cardText') cardText: ElementRef;
  grammarCollection = [];
  faArrowRight = faLongArrowAltRight;

  constructor(private db: DatabaseService,
              elem: ElementRef,
              renderer: Renderer2) {
  }

  ngOnInit() {
    this.db.getCollectionData<GrammarLesson>('grammar')
      .subscribe(res => {
        this.grammarCollection = res;

      });

  }

  ngAfterViewInit() {
    this.cardText.nativeElement.style.color = 'orange';
  }

}
