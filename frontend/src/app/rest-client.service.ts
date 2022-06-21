import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
// @ts-ignore
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {GroupsHelper} from './util/groups.helper';
import {FinanceElement, ShoppingElement} from './models';

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

  createUser(uid: string, email: string, imageUrl: string, username: string): Observable<any> {
    return this.http.post('/posts/user/update', {uid, email, imageUrl, username});
  }

  updateUser(user: any): Observable<any> {
    return this.http.post('/posts/user/update', user);
  }

  updateUserGroupID(uid: string, gid: string): Observable<any> {
    return this.http.post('/posts/user/updateGroupId', {uid, gid});
  }

  updateGroupCode(gid: string, code: string): Observable<any> {
    return this.http.post('/posts/groups/updateCode', {gid, code});
  }

  updateGroupOwner(gid: string, uid: string): Observable<any> {
    return this.http.post('/posts/groups/updateOwner', {gid, uid});
  }

  createGroup(name: string, owner: string): Observable<any> {
    return this.http.post('/posts/groups/update', {
      gid: GroupsHelper.generateUUID(),
      name,
      owner,
      code: GroupsHelper.generateUUID()
    });
  }

  getGroup(gid: string): Observable<any> {
    return gid && gid.length > 0 ? this.http.get('/gets/groups/' + gid) : of(null);
  }

  deleteGroup(gid: string): Observable<any> {
    return this.http.post('/posts/groups/delete', {gid});
  }

  getGroupMembers(gid: string): Observable<any> {
    return this.http.get('/gets/groups/' + gid + '/members');
  }

  getGroupByCode(code: string): Observable<any> {
    return this.http.get('/gets/groups/code/' + code);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  getShoppingList(gid: string): Observable<any> {
    return gid && gid.length > 0 ? this.http.get('/gets/shopping/' + gid) : of(null);
  }

  createShoppingList(gid: string, sid: string): Observable<any> {
    return this.http.post('/posts/shopping/update', {gid, sid});
  }

  updateShoppingList(gid: string, elements: ShoppingElement[]): Observable<any> {
    return this.http.post('/posts/shopping/update', {gid, elements});
  }

  deleteShopping(gid: string): Observable<any> {
    return this.http.post('/posts/shopping/delete', {gid});
  }

  getFinanceList(gid: string): Observable<any> {
    return this.http.get('/gets/finances/' + gid);
  }

  createFinanceList(gid: string): Observable<any> {
    return this.http.post('/posts/finances/update', {gid});
  }

  deleteFinances(gid: string): Observable<any> {
    return this.http.post('/posts/finances/delete', {gid});
  }

  updateFinancesList(gid: string, elements: FinanceElement[]): Observable<any> {
    return this.http.post('/posts/finances/update', {gid, elements});
  }

}
