
import { eventChannel } from "redux-saga";
import { call, put, take } from 'redux-saga/effects';
// Instruments
import { auth, fb } from "../../../../Firebase/firebase";
import { userActions } from "../../actions";
import VOUser from "../../../../VO/VOUser";


export function* authChanged() {
    try {
        console.log("authChanged Saga");
        const channel = yield call(_createAuthChannel);

        while (true) {
            try {                
                const { user } = yield take(channel);

                if (user) {
                    console.log("authChanged SET USER");
                    console.log(user)
                    const userDB = yield call(_checkIfUserExistIDB, user);                    
                    yield put(userActions.setUser(userDB));
                } else {
                    console.log("authChanged REMOVE USER")
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

const _checkIfUserExistIDB = (user:any) => {
    return new Promise((resolve, reject) => {
     
        const userRef = fb.database().ref("users/" + user.uid);

         userRef.onDisconnect().update({ isOnline: false });
     
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
  
  const _getVOUser = (user: any):VOUser => {
    const pUser: VOUser = new VOUser(
        user.uid,
        user.displayName,
        user.photoURL,
        true
    );
    return pUser;
};