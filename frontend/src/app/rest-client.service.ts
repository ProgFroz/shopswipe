import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
// @ts-ignore
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {GroupsHelper} from './util/groups.helper';

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

  createGroup(name: string, owner: string): Observable<any> {
    return this.http.post('/posts/groups/update', {
      gid: GroupsHelper.generateUUID(),
      name,
      owner,
      code: GroupsHelper.generateUUID(),
      members: [owner]
    });
  }

  getGroup(gid: string): Observable<any> {
    return gid.length > 0 ? this.http.get('/gets/groups/' + gid) : of(null);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
