import { call, put } from 'redux-saga/effects';
// Instruments
import { fb } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";
import { gameActions } from "../../actions";


export function* removeGame({ payload }: any) {
    try {
        if (payload) {
            yield call(removeGameFromDB, payload);
        }
        yield put(gameActions.resetGame());
    } catch (error) {
        yield put(modalActions.showError('Error removeGame saga'));
    }
}


const removeGameFromDB = (gameId: string) => {
    fb.database().ref(`games/${gameId}`).remove();
}