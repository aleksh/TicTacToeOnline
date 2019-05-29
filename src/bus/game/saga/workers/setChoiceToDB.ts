import { call, put, apply, all } from 'redux-saga/effects';

// Instruments
import {
    fb
} from '../../../../init/firebaseConfig';
import {gameActions} from "../../actions";

export function* setChoiceToDB({ payload: { gameId, stepId, isItFirstPlayer } }:any) {
    try {    
        yield call(setChoiceToBDFirebase, gameId, stepId, isItFirstPlayer);
       //    yield put(gameActions.resetGame());        
    } catch (error) {
        console.log("setChoiceToDB saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("setChoiceToDB saga completed");
        //yield put(userActions.stopUserFetching());
    }
}

const setChoiceToBDFirebase = (gameId: any, stepId: any, isItFirstPlayer:boolean):void => {    
    fb.database().ref(`games/${gameId}`)
        .update({ stepId, isFirstPlayerTurn: !isItFirstPlayer })
}