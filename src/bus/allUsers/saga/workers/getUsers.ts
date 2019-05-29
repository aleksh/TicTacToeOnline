
import { eventChannel } from "redux-saga";
import { call, take, put } from 'redux-saga/effects';
// Instruments
import { fb, auth } from "../../../../Firebase/firebase";
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";


export function* getUsers() {
    try {
        const channel = yield call(_createUsersChannel);

        while (true) {
            try {
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

            } catch (err) {
                console.error('getUsers socket error:', err)
            }
        }

    } catch (error) {
        console.log("getUsers saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("getUsers saga completed");
        //yield put(userActions.stopUserFetching());
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
