
import { apply, put } from "redux-saga/effects";
import { auth, providerFacebook } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";


export function* login() {
    try {
        yield apply(auth, auth.signInWithPopup, [providerFacebook]);
    } catch (error) {
        yield put(modalActions.showError('Error login saga'));
    }
}
