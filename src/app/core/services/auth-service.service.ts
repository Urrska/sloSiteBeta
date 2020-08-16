import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  user;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    // set an observer on the Auth object to get the currently signed in user
    afAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.emailVerified + 'is signed in');
        this.user = user;
      } else {
        console.log('no user detected');
      }
    }).then();
  }

  register(email, password) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
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

  // sendVerificationEmail() {
  //   console.log(this.afAuth.user);
  // }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }


  //   // shrani userja v localStorage, ko se vpise in ga nastavi na null, ko se izpise
  //   this.angularFireAuth.authState.subscribe(user => {
  //     if (user) {
  //       this.userData = user;
  //       localStorage.setItem('user', JSON.stringify(this.userData));
  //       JSON.parse(localStorage.getItem('user'));
  //     } else {
  //       localStorage.setItem('user', null);
  //       JSON.parse(localStorage.getItem('user'));
  //     }
  //   });
  // }
  //
  // register(email: string, password: string) {
  //   this.angularFireAuth
  //     .auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(res => {
  //       this.sendVerificationMail();
  //       this.setUserData(res.user);
  //       this.router.navigate(['/']);
  //     })
  //     .catch(error => {
  //       this.toastr.error('Oops, something went wrong!');
  //     });
  // }
  //
  // setUserData(user) {
  //   const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     // photoURL: user.photoURL,
  //     // emailVerified: user.emailVerified
  //   };
  //   return userRef.set(userData, {merge: true});
  // }
  //
  // sendVerificationMail() {
  //   return this.angularFireAuth.auth.currentUser.sendEmailVerification()
  //     .then(() => {
  //       this.router.navigate(['/login-register/email-verification']);
  //     });
  // }
  //
  // forgotPassword(passwordResetEmail) {
  //   return this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       this.toastr.success('Password reset email sent, check your inbox.');
  //     }).catch((error) => {
  //       this.toastr.error(error);
  //     });
  // }
  //
  // login(email: string, password: string) {
  //   return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.router.navigate(['/']);
  //     }).catch((error) => {
  //       this.toastr.error(error.message);
  //     });
  // }
  //
  // // preveri, ali je user logged && ali je email verificiran
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false);
  // }
  //
  //
  // logout() {
  //   return this.angularFireAuth.auth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['/login-register/login']).then();
  //   });
  // }
  //
  // get isUserEditor(): boolean {
  //   return this.userData && this.userData.email === 'urska.butara@gmail.com';
  // }

}
