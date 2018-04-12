import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  transcription: Observable<string>;

  constructor(private store: Store<any>) {
    this.transcription = this.store.select('speechRecognition');
  }
}
