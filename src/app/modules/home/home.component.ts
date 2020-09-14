import { Component, OnInit } from '@angular/core';
import {cardData, CardData} from './card-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardData: CardData[] = cardData;
  constructor() { }

  ngOnInit() {
  }


}
