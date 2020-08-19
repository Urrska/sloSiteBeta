import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {switchMap, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {


    // set an observer on the Auth object to get the currently signed in user
    this.user = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  // set user data to firestore on login
  setUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      role: {
        subscriber: true,
        admin: false
      }
    };
    return userRef.set(userData, {merge: true});
  }

  register(email, password) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.setUserData(res.user);
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error.message));
  }


  login(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error.message));
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  sendPasswordResetEmail(email) {
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => this.router.navigate(['/auth/login']))
      .catch(error => console.log(error.message));
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }
}
