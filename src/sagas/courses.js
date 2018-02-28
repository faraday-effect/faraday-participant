// TODO: Re-enable Flow

import {takeLatest, call, put} from "redux-saga/effects";
import {httpGetAuth} from "../lib/api";
import {GET_COURSES_FAILURE, GET_COURSES_REQUEST, GET_COURSES_SUCCESS} from "../reducers/courses";
import {GET_OFFERINGS_SUCCESS} from "../reducers/offerings";
import {GET_SEMESTERS_SUCCESS} from "../reducers/semesters";
import {flashError} from "../reducers/flash";
import {loadingComplete, loadingStarting} from "../reducers/loading";

function* handleCourseRequest(action) {
    yield put(loadingStarting());

    try {
        switch (action.payload) {
            case 'current':
                const currentSemester = yield call(httpGetAuth, 'semesters/current');
                console.log("CUR SEMESTER", currentSemester);
                yield put({type: GET_SEMESTERS_SUCCESS, ...currentSemester});

                const result = yield call(httpGetAuth, ['offerings', currentSemester.payload._id]);
                console.log("COMBO RESULT", result);
                yield put({type: GET_OFFERINGS_SUCCESS, ...result.payload.offerings});
                yield put({type: GET_COURSES_SUCCESS, ...result.payload.courses});

                break;
            case 'all':
                let response = yield call(httpGetAuth, 'courses');
                yield put({type: GET_COURSES_SUCCESS, ...response});

                response = yield call(httpGetAuth, 'offerings');
                yield put({type: GET_OFFERINGS_SUCCESS, ...response});

                response = yield call(httpGetAuth, 'semesters');
                yield put({type: GET_SEMESTERS_SUCCESS, ...response});
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
