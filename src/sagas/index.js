import {all} from 'redux-saga/effects';
import {watchForLogin} from './user';

export default function* rootSaga() {
    yield all([
        watchForLogin()
    ])
}
