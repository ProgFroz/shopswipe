import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-p12l',
  templateUrl: './home-p12l.component.html',
  styleUrls: ['./home-p12l.component.css']
})
export class HomeP12lComponent implements OnInit {

  @Output() logoutEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitLogout(): void {
    this.logoutEmitter.emit(true);
  }
}
