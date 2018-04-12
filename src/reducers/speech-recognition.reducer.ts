import { Action } from '@ngrx/store';

export const speechRecActions = {
	BROADCAST_TRANSCRIPTION_RESULTS: 'BROADCAST_TRANSCRIPTION_RESULTS'
};

export function speechRecReducer(state = '', action) {
	switch(action.type) {
		case speechRecActions.BROADCAST_TRANSCRIPTION_RESULTS:
			return action.payload;
		default:
			return state;
	}
}