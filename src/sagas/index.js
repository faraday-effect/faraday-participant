import {all} from 'redux-saga/effects';
import {watchForLogin} from './user';
import {watchCourses} from "./courses";

export default function* rootSaga() {
    yield all([
        watchForLogin(),
        watchCourses()
    ])
}
