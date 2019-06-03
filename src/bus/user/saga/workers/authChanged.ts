
import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { auth, fb } from "../../../../init/firebaseConfig";
import VOUser from "../../../../VO/VOUser";
import { allUsersActions } from "../../../allUsers/actions";
import { gameActions } from "../../../game/actions";
import { modalActions } from "../../../modal/actions";
import { userActions } from "../../actions";


export function* authChanged() {
    try {
        const channel = yield call(_createAuthChannel);

        while (true) {
            const { user } = yield take(channel);

            if (user) {
                const userDB = yield call(_checkIfUserExistIDB, user);
                yield call(_setOnDisconnect, userDB.uid);

                // subscribe for Games/ get all Users (if not subscribed)
                const isSubscribe = yield select(isSubscribed);
                if (!isSubscribe) {
                    yield put(gameActions.subscribeForGamesAsync());
                    yield put(allUsersActions.getUsersAsync());
                }

                yield put(userActions.setUser(userDB));

            } else {
                yield put(userActions.logout());
                yield put(userActions.initialized());
            }

        }

    } catch (error) {
        yield put(modalActions.showError('Error authChanged saga'));
    }
}


const _createAuthChannel = () => {
    return eventChannel(emit => {
        const unsubscribe = auth.onAuthStateChanged(user => emit({ user }));
        return unsubscribe;
    });
}

const _checkIfUserExistIDB = (user: any) => {
    return new Promise((resolve, reject) => {
        const userRef = fb.database().ref("users/" + user.uid);

        userRef.once("value")
            .then(snapshot => {
                var pIsUser = snapshot.val();
                if (pIsUser) {
                    pIsUser.isOnline = true;

                    userRef.update(pIsUser,
                        error => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(pIsUser);
                            }
                        }
                    );

                } else {
                    userRef
                        .set(
                            {
                                uid: user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                                isOnline: true
                            },
                            error => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(_getVOUser(user));
                                }
                            }
                        );
                }
            });
    });
}

const _setOnDisconnect = (userId: string) => {
    fb.database().ref("users/" + userId).onDisconnect().update({ isOnline: false });
}


const _getVOUser = (user: any): VOUser => {
    const pUser: VOUser = new VOUser(
        user.uid,
        user.displayName,
        user.photoURL,
        true
    );
    return pUser;
};

const isSubscribed = (state: any) => state.user.get("isSubscribed");

