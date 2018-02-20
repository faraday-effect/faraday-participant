import {takeLatest, call, put} from "redux-saga/effects";
import {httpPost} from "../lib/api";
import {USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../reducers/user";
import {flashError, flashInfo} from "../reducers/flash";

// JavaScript Web Token support
const JWT_LOCAL_STORAGE_KEY = 'faraday-jwt';

export function getUserJWT(): string {
    return window.localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
}

function setUserJWT(jwt: string) {
    window.localStorage.setItem(JWT_LOCAL_STORAGE_KEY, jwt);
}

function clearUserJWT() {
    window.localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
}

// Sagas
function* handleLogin(action) {
    clearUserJWT();
    try {
        const response = yield call(httpPost, 'authenticate', {
            email: action.payload.email,
            password: action.payload.password
        });
        if (response.error) {
            console.log(response);
            yield put(flashError(`Can't log in: ${response.payload.message}`));
        } else {
            setUserJWT(response.payload.jwt);
            yield put({
                type: USER_LOGIN_SUCCESS,
                ...response
            });
            const {firstName, lastName} = response.payload.user;
            yield put(flashInfo(`${firstName} ${lastName} logged in successfully`));
        }
    } catch (error) {
        yield put({
            type: USER_LOGIN_FAILURE,
            error: true,
            payload: error
        });
        yield put(flashError(`Failed to log in (${error})`));
    }
}

export function* watchForLogin() {
    yield takeLatest(USER_LOGIN_REQUEST, handleLogin);
}
