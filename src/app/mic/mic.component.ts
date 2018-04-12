import { Component } from '@angular/core';
import { SpeechRecognition } from './speech-recognition.service';
import { Store } from '@ngrx/store';
import { speechRecActions } from '../../reducers/speech-recognition.reducer';

@Component({
  selector: 'app-mic',
  templateUrl: 'mic.html'
})
export class MicComponent {

  public transcription: string = `Press the mic button to make a request...`;

  constructor(
	public speechRecognition: SpeechRecognition,
	private store: Store<any>
  ) {
    this.speechRecognition.recognizer.continuous      = true;
    this.speechRecognition.recognizer.interimResults  = true;
    this.speechRecognition.recognizer.onresult        = this.onResult.bind(this);
    this.speechRecognition.recognizer.onerror         = this.onError.bind(this);
    this.speechRecognition.recognizer.onsoundstart    = this.onSoundStart.bind(this);
    this.speechRecognition.recognizer.onsoundend      = this.onSoundEnd.bind(this);
    this.speechRecognition.recognizer.onspeechstart   = this.onSpeechStart.bind(this);
    this.speechRecognition.recognizer.onspeechend     = this.onSpeechEnd.bind(this);
  }

  public toggleSpeechRecognition() {
    if (!this.speechRecognition.isRecording) {
      this.speechRecognition.start();
    } else {
      this.speechRecognition.stop();
    }
  }

  private onResult(event) {
    this.transcription = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        this.transcription = event.results[i][0].transcript;
      } else {
        this.transcription += event.results[i][0].transcript;
      }
	}
	this.store.dispatch({ type: speechRecActions.BROADCAST_TRANSCRIPTION_RESULTS, payload: this.transcription });
  }

  private onError(event) {
    console.log('onError', event);
  }

  private onSpeechStart(event) {
    console.log('onSpeechStart', event);
  }

  private onSpeechEnd(event) {
    console.log('onSpeechEnd', event);
  }

  private onSoundStart(event) {
    console.log('onSoundStart', event);
  }

  private onSoundEnd(event) {
    console.log('onSoundEnd', event);
  }
}
