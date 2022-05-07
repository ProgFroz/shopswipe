
import {User} from './models';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// @ts-ignore
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class RestClientService {

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

  getUser(uid: string): Observable<any> {
    return this.http.get('/gets/user/' + uid);
  }

  createUser(uid: string, email: string, imageUrl: string): Observable<any> {
    return this.http.post('/posts/user/update', {uid, email, imageUrl});
  }

  updateUser(user: any): Observable<any> {
    return this.http.post('/posts/user/update', user);
  }
}
