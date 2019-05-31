
import { apply, put } from 'redux-saga/effects';
// Instruments
import { auth } from '../../../../init/firebaseConfig';
import { modalActions } from "../../../modal/actions";


export function* logout() {
    try {
        yield apply(auth, auth.signOut, []);
    } catch (error) {
        yield put(modalActions.showError('Error logout saga'));
    }
}
