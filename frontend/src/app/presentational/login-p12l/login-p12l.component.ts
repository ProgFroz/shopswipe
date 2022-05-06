import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestClientService} from '../../rest-client.service';
import {AppState} from '../../ngrx/ngrx-models';
import {Store} from '@ngrx/store';
import {User} from '../../models';
import {loadUserSuccess} from '../../ngrx/action/user.actions';

@Component({
  selector: 'app-login-p12l',
  templateUrl: './login-p12l.component.html',
  styleUrls: ['./login-p12l.component.css']
})
export class LoginP12lComponent implements OnInit {

  @Output() googleSignIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: RestClientService, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  emitGoogleSignIn(): void {
    this.googleSignIn.emit(true);
  }

  googleSignInMethod(): void {
    this.authService.googleSignIn().then((t) => {
      if (t) {
        this.authService.getUser(t.user.uid).subscribe((u: User) => {
          if (u) {
            this.store.dispatch(loadUserSuccess({user: u}));
          } else {
            this.authService.updateUser({
              uid: t.user.uid,
              imageUrl: t.user.photoURL
            }).subscribe((userx: User) => {
              if (userx) {
                this.store.dispatch(loadUserSuccess({user: userx}));
              }
            });
          }
        });
      } else {
        console.error('t was null');
      }
    });
  }
}
