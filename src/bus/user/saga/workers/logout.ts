
import { apply } from 'redux-saga/effects';
// Instruments
import { auth } from '../../../../init/firebaseConfig';


export function* logout() {
    try {
        yield apply(auth, auth.signOut, []);
    } catch (error) {
        console.log("logout saga Error");
    }
}
