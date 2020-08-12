import { Component, OnInit } from '@angular/core';
import {faGlobeEurope} from '@fortawesome/free-solid-svg-icons/faGlobeEurope';
import {faLanguage} from '@fortawesome/free-solid-svg-icons/faLanguage';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faGlobe = faGlobeEurope;
  faLanguage = faLanguage;
  faKeyboard = faKeyboard;

  constructor() { }

  ngOnInit(): void {
  }

}
