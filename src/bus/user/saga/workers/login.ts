
import { apply } from 'redux-saga/effects';
// Instruments
import { auth, providerFacebook } from '../../../../init/firebaseConfig';


export function* login() {
    try {
        yield apply(auth, auth.signInWithPopup, [providerFacebook]);
    } catch (error) {
        console.log("login saga Error");
    }
}
