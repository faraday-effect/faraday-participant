import {takeLatest, call, put} from "redux-saga/effects";
import {httpPost} from "../lib/api";
import {USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../reducers/user";

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



/*
1. HAVE THE SAGA LISTEN FOR A LOGIN REQUEST (PLAIN ACTION THAT INCLUDES EMAIL and PASSWORD)
2. REWRITE (AGAIN) API TO BE SIMPLE CALLS;
   DOESN'T MAKE SENSE TO DISPATCH LOGIN AND yield httpPost WITHIN SAGA;
   WANT MORE CONTROL IN SAGA
LOGIN_REQUEST -- From Login.js scene
LOGIN_SUCCESS -- Handled in Saga
LOGIN_FAILURE -- Handled in Saga
3. DO ALL SIDE EFFECTS IN SAGA: API, Local Storage, fl;
   message
4. KEEP API MIDDLEWARE AROUND? USE FOR NON-SAGA STUFF? OR JUST USE SAGAS EVERYWHERE?
*/




// Sagas
function* handleLogin(action) {
    clearUserJWT();
    try {
        const response = yield call(httpPost, 'authenticate', {
            email: action.payload.email,
            password: action.payload.password
        });
        setUserJWT(response.payload.jwt);
        yield put({
            type: USER_LOGIN_SUCCESS,
            ...response
        });
    } catch (error) {
        yield put({
            type: USER_LOGIN_FAILURE,
            error: true,
            payload: error
        })
    }
}

export function* watchForLogin() {
    yield takeLatest(USER_LOGIN_REQUEST, handleLogin);
}
