import {Component, OnInit} from '@angular/core';
import {PracticeGapfill} from '../../core/models/practice-gapfill';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {DatabaseService} from '../../core/services/database-service.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  practiceGapfillCollection: PracticeGapfill[];
  faEdit = faEdit;
  faList = faList;

  constructor(private db: DatabaseService) {
  }

  ngOnInit() {
    this.db.getCollectionData<PracticeGapfill>('practice-gapfill')
      .subscribe(gapfillExercises => {
        this.practiceGapfillCollection = gapfillExercises.map(practiceGapfill => new PracticeGapfill(practiceGapfill));
      });
  }

}
