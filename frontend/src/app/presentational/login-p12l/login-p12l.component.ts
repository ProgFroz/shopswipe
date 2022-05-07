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
}
