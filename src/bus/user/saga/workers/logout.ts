
import { apply, call, put } from "redux-saga/effects";
import { auth, fb } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";


export function* logout() {
    try {
        yield call(_setUserOffline, auth.currentUser!.uid);
        yield call(_unsubscribe);
        yield apply(auth, auth.signOut, []);
    } catch (error) {
        yield put(modalActions.showError('Error logout saga'));
    }
}


const _setUserOffline = (userId: string = ""): void => {
    if (userId.length > 0) {
        fb.database().ref("users/" + userId).update({ isOnline: false });
    }
}

const _unsubscribe = (): void => {
    fb.database().ref("users").off();
    fb.database().ref("games").off();
}
