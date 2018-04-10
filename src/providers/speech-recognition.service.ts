import { Injectable } from "@angular/core";

const SpeechRecognizer = (<any>window).webkitSpeechRecognition || (<any>window).speechRecognition;

@Injectable()
export class SpeechRecognition {

	public isRecording: boolean = false;
	public recognizer: any;

	constructor() {
		this.recognizer = new SpeechRecognizer();
	}

	public start() {
		this.isRecording = true;
		try {
			this.recognizer.start();
		} catch (ex) {
			console.error(`Recognition error: ${ex.message}`);
		}
	}

	public stop() {
		this.isRecording = false;
		this.recognizer.stop();
	}
}