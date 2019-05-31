import { call, put } from 'redux-saga/effects';
// Instruments
import { fb } from '../../../../init/firebaseConfig';
import { modalActions } from "../../../modal/actions";


export function* setChoiceToDB({ payload: { gameId, stepId, isItFirstPlayer } }: any) {
    try {
        yield call(setChoiceToBDFirebase, gameId, stepId, isItFirstPlayer);
    } catch (error) {
        yield put(modalActions.showError('Error setChoiceToDB saga'));
    }
}

const setChoiceToBDFirebase = (gameId: any, stepId: any, isItFirstPlayer: boolean): void => {
    fb.database().ref(`games/${gameId}`)
        .update({ stepId, isFirstPlayerTurn: !isItFirstPlayer })
}