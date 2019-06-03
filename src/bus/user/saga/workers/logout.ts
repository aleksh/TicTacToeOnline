
import { apply, put, call } from "redux-saga/effects";
import { auth } from "../../../../init/firebaseConfig";
import { modalActions } from "../../../modal/actions";
import { fb } from "../../../../init/firebaseConfig";


export function* logout() {
    try {        
        yield call(_setUserOffline, auth.currentUser!.uid);
        yield apply(auth, auth.signOut, []);
    } catch (error) {
        yield put(modalActions.showError('Error logout saga'));
    }
}


const _setUserOffline = (userId: string = ""):void => {
    if(userId.length > 0) {
        fb.database().ref("users/" + userId).update({ isOnline: false });        
    }
}