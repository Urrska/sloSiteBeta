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
        this.setUserData(res.user).then(() => {
          this.verifyEmail();
          if (!res.user.emailVerified) {
            this.router.navigate(['/']);
          } else {
            alert('Please verify your email address before navigating to sloSite.');
          }
        });
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
      this.router.navigate(['/account/login']);
    });
  }

  verifyEmail() {
    this.afAuth.user.subscribe(user => user.sendEmailVerification());
  }

  sendPasswordResetEmail(email) {
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        alert('You\'ve got mail with instructions');
        this.router.navigate(['/login']);
      })
      .catch(error => this.handleErrorMessages(error));
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  handleErrorMessages(error) {
    if (error.code === 'account/email-already-exists') {
      this.errorMessages = 'The provided email is already in use by an existing user.';
    } else if (error.code === 'account/internal-error') {
      this.errorMessages = 'Something wen\'t wrong on our side and we\'re working on it. Thanks for the patience.';
    } else if (error.code === 'account/user-not-found') {
      this.errorMessages = 'We assume you\'re a first time visitor. Click the register button and register first.';
    } else if (error.code === 'account/maximum-user-count-exceeded') {
      this.errorMessages = 'sloSite is at capacity and we\'re working on it. Thanks for the patience.';
    } else if (error.code === 'account/invalid-password') {
      this.errorMessages = 'The provided password is too short, it must have at least six characters.';
    } else if (error.code === 'account/invalid-last-sign-in-time') {
      this.errorMessages = 'Your account has been deactivated due to inactivity. Feel free to register again.';
    } else if (error.code === 'account/invalid-email') {
      this.errorMessages = 'The provided email is malformed. Please, check for typos.';
    } else if (error.code === 'account/invalid-email-verified') {
      this.errorMessages = 'Please, verify your email address before you continue to the website.';
    } else {
      this.errorMessages = 'Something wen\'t wrong. Please, check if your information is correct.';
    }
  }
}
