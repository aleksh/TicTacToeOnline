// Core
import { all, call } from 'redux-saga/effects';
import { watchAllUsers } from '../bus/allUsers/saga/watchers';
import { watchGame } from '../bus/game/saga/watchers';
// Watchers
import { watchUser } from '../bus/user/saga/watchers';


export function* rootSaga() {
    yield all([call(watchUser), call(watchAllUsers), call(watchGame)]);
}
