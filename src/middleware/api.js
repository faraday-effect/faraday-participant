// @flow

import request from "request";
import {getUserJWT} from "../reducers/user";

const BASE_URL = 'http://localhost:8000/api';

type StringOrArray = string | Array<string>;

const CALL_API = "API/CALL";

function makeUrl(urlTail: StringOrArray): string {
    let urlSegments = [BASE_URL];
    if (Array.isArray(urlTail)) {
        urlSegments = urlSegments.concat(urlTail);
    } else {
        urlSegments.push(urlTail);
    }
    return urlSegments.join('/');
}

type ActionTypes = Array<string>;

type HttpAction = {
    type: string,
    payload: {
        method: 'GET' | 'POST',
        endpoint: string,
        authenticated: boolean,
        body?: Object,
        actionTypes: ActionTypes
    }
};

function httpRequest(method: 'POST'|'GET',
                     endpoint: string,
                     jwt: ?string = null,
                     body: ?Object = null): Promise<Object> {
    const options: Object = {
        method,
        url: endpoint,
        json: true
    };

    if (jwt) {
        options.auth = {bearer: jwt};
    }

    if (body) {
        options.body = body;
    }

    return new Promise((resolve, reject) =>
        request(options, (error, response, body) => {
            if (error) {
                return reject(error);
            } else {
                return resolve({
                    ok: response.statusCode >= 200 && response.statusCode <= 299,
                    statusCode: response.statusCode,
                    payload: body
                });
            }
        })
    );
}

// Action creators
export const httpGetAuth = (urlTail: StringOrArray,
                            actionTypes: ActionTypes): HttpAction => ({
    type: CALL_API,
    payload: {
        method: 'GET',
        endpoint: makeUrl(urlTail),
        authenticated: true,
        actionTypes
    }
});

export const httpPostAuth = (urlTail: StringOrArray,
                             body: Object,
                             actionTypes: ActionTypes): HttpAction => ({
    type: CALL_API,
    payload: {
        method: 'POST',
        endpoint: makeUrl(urlTail),
        authenticated: true,
        body,
        actionTypes
    }
});

export const httpPost = (urlTail: StringOrArray,
                         body: Object,
                         actionTypes: ActionTypes): HttpAction => ({
    type: CALL_API,
    payload: {
        method: 'POST',
        endpoint: makeUrl(urlTail),
        authenticated: false,
        body,
        actionTypes
    }
});

export const apiMiddleware = (store: Store) => (next: Dispatch<HttpAction>) => (action: HttpAction) => {
    if (action.type !== CALL_API) {
        return next(action);        // Not for us.
    }

    const [initActionType, okayActionType, failActionType] = action.payload.actionTypes;

    next({type: initActionType});

    httpRequest(action.payload.method,
        action.payload.endpoint,
        action.payload.authenticated ? getUserJWT() : null,
        action.payload.body)
        .then(response => {
            if (response.ok) {
                next({type: okayActionType, payload: response.payload});
            } else {
                next({type: failActionType, payload: response.payload});
            }
        })
        .catch(error => {
            next({type: failActionType, payload: error});
        });
};
