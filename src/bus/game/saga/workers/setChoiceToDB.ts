import { call } from 'redux-saga/effects';
// Instruments
import { fb } from '../../../../init/firebaseConfig';


export function* setChoiceToDB({ payload: { gameId, stepId, isItFirstPlayer } }: any) {
    try {
        yield call(setChoiceToBDFirebase, gameId, stepId, isItFirstPlayer);
    } catch (error) {
        console.log("setChoiceToDB saga Error");
        // CHECK fOR eRROR
    }
}

const setChoiceToBDFirebase = (gameId: any, stepId: any, isItFirstPlayer: boolean): void => {
    fb.database().ref(`games/${gameId}`)
        .update({ stepId, isFirstPlayerTurn: !isItFirstPlayer })
}