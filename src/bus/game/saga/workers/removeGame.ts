import { call, put } from 'redux-saga/effects';
// Instruments
import { fb } from "../../../../init/firebaseConfig";
import { gameActions } from "../../actions";


export function* removeGame({ payload }: any) {
    try {
        if (payload) {
            yield call(removeGameFromDB, payload);
        }
        yield put(gameActions.resetGame());
    } catch (error) {
        console.log("removeGame saga Error");
    }
}


const removeGameFromDB = (gameId: string) => {
    fb.database().ref(`games/${gameId}`).remove();
}