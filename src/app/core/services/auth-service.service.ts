import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  user: Observable<User>;
  errorMessages: string;

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
      .catch(error => this.handleErrorMessages(error));
  }

  login(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => this.handleErrorMessages(error));
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

  handleErrorMessages(error) {
    if (error.code === 'auth/email-already-exists') {
      this.errorMessages = 'The provided email is already in use by an existing user.';
    } else if (error.code === 'auth/internal-error') {
      this.errorMessages = 'Something wen\'t wrong on our side and we\'re working on it. Thanks for the patience.';
    } else if (error.code === 'auth/user-not-found') {
      this.errorMessages = 'We assume you\'re a first time visitor. Click the register button and register first.';
    } else if (error.code === 'auth/maximum-user-count-exceeded') {
      this.errorMessages = 'sloSite is at capacity and we\'re working on it. Thanks for the patience.';
    } else if (error.code === 'auth/invalid-password') {
      this.errorMessages = 'The provided password is too short, it must have at least six characters.';
    } else if (error.code === 'auth/invalid-last-sign-in-time') {
      this.errorMessages = 'Your account has been deactivated due to inactivity. Feel free to register again.';
    } else if (error.code === 'auth/invalid-email') {
      this.errorMessages = 'The provided email is not really an email. Please check for typos.';
    } else if (error.code === 'auth/invalid-email-verified') {
      this.errorMessages = 'Please, verify your email before you continue to the website.';
    }
  }
}
