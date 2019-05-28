// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { inviteToGame, removeGame } from './workers';

function* watchInviteToGame() {
    yield takeEvery(types.INVITE_OPPONENT_TO_GAME_ASYNC, inviteToGame);
}

function* watchRemoveGame() {
    yield takeEvery(types.REMOVE_GAME_ASYNC, removeGame);
}

export function* watchGame() {
    yield all([call(watchInviteToGame), call(watchRemoveGame)]);
}