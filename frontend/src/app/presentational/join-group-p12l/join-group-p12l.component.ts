import {Component, Input, OnInit} from '@angular/core';
import {Params} from '@angular/router';

@Component({
  selector: 'app-join-group-p12l',
  templateUrl: './join-group-p12l.component.html',
  styleUrls: ['./join-group-p12l.component.css']
})
export class JoinGroupP12lComponent implements OnInit {

  @Input() params: Params;

  constructor() { }

  ngOnInit(): void {
  }

}
