// TODO: Re-enable Flow

import {takeLatest, call, put} from "redux-saga/effects";
import {httpGetAuth} from "../lib/api";
import {GET_COURSES_FAILURE, GET_COURSES_REQUEST, GET_COURSES_SUCCESS} from "../reducers/courses";
import {GET_OFFERINGS_SUCCESS} from "../reducers/offerings";
import {GET_SEMESTER_SUCCESS} from "../reducers/semester";
import {flashError} from "../reducers/flash";
import {loadingComplete, loadingStarting} from "../reducers/loading";

function* handleCourseRequest(action) {
    yield put(loadingStarting());

    try {
        switch (action.payload) {
            case 'current':
                const currentSemester = yield call(httpGetAuth, 'semesters/current');
                const currentOfferings = yield call(httpGetAuth, ['offerings', currentSemester.body._id]);

                yield put({
                    type: GET_SEMESTER_SUCCESS,
                    payload: currentSemester.body
                });
                yield put({
                    type: GET_OFFERINGS_SUCCESS,
                    payload: currentOfferings.body.offerings
                });
                yield put({
                    type: GET_COURSES_SUCCESS,
                    payload: currentOfferings.body.courses
                });
                break;
            case 'all':
                let response = yield call(httpGetAuth, 'courses');
                yield put({type: GET_COURSES_SUCCESS, ...response});

                response = yield call(httpGetAuth, 'offerings');
                yield put({type: GET_OFFERINGS_SUCCESS, ...response});

                response = yield call(httpGetAuth, 'semesters');
                yield put({type: GET_SEMESTER_SUCCESS, ...response});
                break;
            default:
                yield put(flashError(`Invalid action payload (${action.payload})`));
        }
    } catch (error) {
        yield put({
            type: GET_COURSES_FAILURE,
            error: true,
            payload: error
        });
        yield put(flashError(`Failed to fetch courses(${error})`));
    }

    yield put(loadingComplete());
}

export function* watchCourses(): Saga<void> {
    yield takeLatest(GET_COURSES_REQUEST, handleCourseRequest);
}
