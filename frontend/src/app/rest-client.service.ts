import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({providedIn: 'root'})
export class AuthService {

  authState: any = null;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.angularFireAuth.authState.subscribe((a) => {
      this.authState = a;
    });
  }

  googleSignIn(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider);
  }
}
