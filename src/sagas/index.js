// @flow

import {flashInfo} from "../reducers/flash";
import {put} from "redux-saga/effects";

export function* helloSaga(): Saga<void> {
    yield put(flashInfo("Hello, Saga"));
}
