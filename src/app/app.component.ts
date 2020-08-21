import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sloSite';

  items: Observable<any[]>;
  isNavigationShown = true;

  constructor(private router: Router,
              firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url)
      )
      .subscribe(() => {
        if (window.location.href.includes('auth')) {
          return this.isNavigationShown = false;
        } else {
          return this.isNavigationShown = true;
        }
      });

  }
}
