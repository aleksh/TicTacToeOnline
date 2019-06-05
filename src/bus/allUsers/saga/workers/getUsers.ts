
import { eventChannel } from "redux-saga";
import { call, put, take } from "redux-saga/effects";
import { auth, fb } from "../../../../init/firebaseConfig";
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";
import { modalActions } from "../../../modal/actions";
import { userActions } from "../../../user/actions";


export function* getUsers() {
    try {
        const channel = yield call(_createUsersChannel);

        while (true) {

            const snap = yield take(channel);
            if (snap.exists()) {
                let usersList: VOUser[] = [];
                let currentUser:any;
                const userId: any = auth.currentUser!.uid;                
                snap.forEach((child: any) => {
                    if (userId !== child.val().uid) {
                        usersList.push(child.val() as VOUser);
                    } else {
                        currentUser = child.val() as VOUser;
                    }
                });

                yield put(userActions.setUser(currentUser));   
                yield put(allUsersActions.updateUsers(usersList));
            }

        }

    } catch (error) {
        yield put(modalActions.showError('Error getUsers saga'));
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