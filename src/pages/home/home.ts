import { Component, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '../../providers/speech-recognition.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public transcription: string = `Press the mic button to make a request...`;

  constructor(
    public speechRecognition: SpeechRecognition,
    private cd: ChangeDetectorRef
  ) {
    this.speechRecognition.recognizer.continuous      = true;
    this.speechRecognition.recognizer.interimResults  = true;
    this.speechRecognition.recognizer.onresult        = this.onTranscriptionResult.bind(this);
    this.speechRecognition.recognizer.onerror         = this.onTranscriptionError.bind(this);
  }

  public toggleSpeechRecognition() {
    if (!this.speechRecognition.isRecording) {
      this.speechRecognition.start();
    } else {
      this.speechRecognition.stop();
    }
  }

  private onTranscriptionResult(event) {
    this.transcription = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        this.speechRecognition.stop();
        this.transcription = event.results[i][0].transcript;
      } else {
        this.transcription += event.results[i][0].transcript;
      }
    }
    this.cd.detectChanges();
  }

  private onTranscriptionError(event) {
    console.log('onTranscriptionError', event);
  }
}
