import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import {initializeApp} from 'firebase-admin/lib/firebase-namespace-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'shopswipe';

  constructor() {
  }
}
