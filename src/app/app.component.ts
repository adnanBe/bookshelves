import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDrA34ox60RhRJ4Yy3aAFdCEqhzlaXP5Ew',
      authDomain: 'bookshelves-e06af.firebaseapp.com',
      databaseURL: 'https://bookshelves-e06af.firebaseio.com',
      projectId: 'bookshelves-e06af',
      storageBucket: 'gs://bookshelves-e06af.appspot.com/',
      messagingSenderId: '51389209310',
      appId: '1:51389209310:web:8beaf9a5eaa227ea'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
