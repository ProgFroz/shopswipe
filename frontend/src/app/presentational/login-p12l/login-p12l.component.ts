import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login-p12l',
  templateUrl: './login-p12l.component.html',
  styleUrls: ['./login-p12l.component.css']
})
export class LoginP12lComponent implements OnInit {

  @Output() googleSignIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  emitGoogleSignIn(): void {
    this.googleSignIn.emit(true);
  }
}
