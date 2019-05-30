import { call, put, apply, all } from 'redux-saga/effects';

// Instruments
import {
    fb
} from "../../../../init/firebaseConfig";
import { gameActions } from "../../actions";

export function* removeGame({ payload }:any) {
    try {
        console.log("removeGame Saga" + payload);
        if(payload) {
            console.log("remove from db");
            yield call(removeGameFromDB, payload);
        }
        yield put(gameActions.resetGame());        
    } catch (error) {
        console.log("removeGame saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("removeGame saga completed");
        //yield put(userActions.stopUserFetching());
    }
}


const removeGameFromDB = (gameId: string) => {
    fb.database().ref(`games/${gameId}`).remove();
}