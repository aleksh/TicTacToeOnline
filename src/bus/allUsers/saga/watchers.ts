// Core
import { all, call, takeEvery } from "redux-saga/effects";
// Types
import { types } from "../types";
// Workers
import { getUsers } from "./workers";



function* watchGetUsers() {
    yield takeEvery(types.GET_USERS_ASYNC, getUsers);
}

export function* watchAllUsers() {
    yield all([call(watchGetUsers)]);
}