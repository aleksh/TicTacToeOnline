// Core
import { all, call, takeEvery } from 'redux-saga/effects';
// Types
import { types } from '../types';
// Workers
import { authChanged, login, logout } from './workers';



function* watchLogin() {
    yield takeEvery(types.LOGIN_ASYNC, login);
}

function* watchLogout() {
    yield takeEvery(types.LOGOUT_ASYNC, logout);
}

function* watchAuthChanged() {
    yield takeEvery(types.AUTH_CHANGED_ASYNC, authChanged);
}

export function* watchUser() {
    yield all([call(watchLogin), call(watchLogout), call(watchAuthChanged)]);
}