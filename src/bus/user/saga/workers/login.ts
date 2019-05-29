
import { call, put, apply, all } from 'redux-saga/effects';

// Instruments
import {
	auth,
	providerFacebook
} from '../../../../init/firebaseConfig';

export function* login () {
    try {
        console.log("Login Saga");
        //yield put(userActions.startUserFetching());
        yield apply(auth, auth.signInWithPopup, [providerFacebook]);
        //auth.signInWithPopup(providerFacebook)
       // yield put(userActions.login(categories));
    } catch (error) {
        console.log("login saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("login saga completed");
        //yield put(userActions.stopUserFetching());
    }
}
