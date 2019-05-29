
import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
// Instruments
import { auth, fb } from '../../../../init/firebaseConfig';
import VOUser from '../../../../VO/VOUser';
import { userActions } from '../../actions';


export function* authChanged() {
    try {
        const channel = yield call(_createAuthChannel);

        while (true) {
            try {
                const { user } = yield take(channel);

                if (user) {
                    const userDB = yield call(_checkIfUserExistIDB, user);
                    yield call(_setOnDisconnect, userDB.uid);
                    yield put(userActions.setUser(userDB));
                } else {
                    yield put(userActions.logout());
                }

            } catch (err) {
                console.error('authChanged socket error:', err)
            }
        }

    } catch (error) {
        console.log("authChanged saga Error");
        //yield put(userActions.emitUserError(error, 'login'));
    } finally {
        console.log("authChanged saga completed");
        //yield put(userActions.stopUserFetching());
    }
}

/*
const createUserChannel = userId =>
  eventChannel(emit => {
    const ref = firebaseDatabase().ref(`/users/${userId}`)
    ref.on('value', snap => {
      emit(snap.val())
    })

    const unsubscribe = ref.off()
    return unsubscribe
  })
*/

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


