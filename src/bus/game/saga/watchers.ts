// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { inviteToGame, removeGame, setChoiceToDB, subscribeForGames, subscribeForCurrentGame } from './workers';

function* watchInviteToGame() {
    yield takeEvery(types.INVITE_OPPONENT_TO_GAME_ASYNC, inviteToGame);
}

function* watchRemoveGame() {
    yield takeEvery(types.REMOVE_GAME_ASYNC, removeGame);
}

function* watchSetChoiceToDB() {
    yield takeEvery(types.SET_CHOICE_TO_DB_ASYNC, setChoiceToDB);
}

function* watchSubscribeForGames() {
    yield takeEvery(types.SUBSCRIBE_FOR_GAMES, subscribeForGames);
}

function* watchSubscribeForCurrentGame() {
    yield takeEvery(types.SUBSCRIBE_FOR_CURRENT_GAME, subscribeForCurrentGame);
}

export function* watchGame() {
    yield all([call(watchInviteToGame), call(watchRemoveGame), call(watchSetChoiceToDB), call(watchSubscribeForGames), call(watchSubscribeForCurrentGame)]);
}