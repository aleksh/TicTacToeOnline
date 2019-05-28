// Core
import { all, call } from 'redux-saga/effects';

// Watchers
import { watchUser } from '../bus/user/saga/watchers';
import { watchAllUsers } from '../bus/allUsers/saga/watchers';

export function* rootSaga () {
    yield all([call(watchUser), call(watchAllUsers)]);    
}
