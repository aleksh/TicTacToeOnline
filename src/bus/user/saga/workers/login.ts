
import { apply, put } from "redux-saga/effects";
import { auth } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";


export function* login({ payload }: any) {
    try {
        yield apply(auth, auth.signInWithPopup, [payload]);
    } catch (error) {
        yield put(modalActions.showError(error.message));
    }
}
