
import { eventChannel } from "redux-saga";
import { call, put, take } from 'redux-saga/effects';
// Instruments
import { auth, fb } from '../../../../init/firebaseConfig';
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";


export function* getUsers() {

    const channel = yield call(_createUsersChannel);

    while (true) {

        const snap = yield take(channel);
        if (snap.exists()) {
            let usersList: VOUser[] = [];
            const userId: any = auth.currentUser!.uid;
            snap.forEach((child: any) => {
                if (userId !== child.val().uid) {
                    usersList.push(child.val() as VOUser);
                }
            });
            yield put(allUsersActions.updateUsers(usersList));
        }
    }

}




const _createUsersChannel = () => {
    return eventChannel((emit): any => {
        const ref = fb.database().ref("users");
        ref.on('value', snap => {
            emit(snap);
        })

        const unsubscribe = () => {
            ref.off();
        }
        return unsubscribe
    });
}
