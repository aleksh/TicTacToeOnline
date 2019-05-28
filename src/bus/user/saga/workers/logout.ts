
import { call, put, apply, all } from 'redux-saga/effects';

// Instruments
import {
	auth,	
} from "../../../../Firebase/firebase";

export function* logout () {
    try {
        console.log("logout Saga");
        //yield put(userActions.startUserFetching());
        yield apply(auth, auth.signOut, []);
        //auth.signInWithPopup(providerFacebook)
       // yield put(userActions.login(categories));
    } catch (error) {
        console.log("logout saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("logout saga completed");
        //yield put(userActions.stopUserFetching());
    }
}
