// @flow

import request from "request";
import {getUserJWT} from "../reducers/user";

const BASE_URL = 'http://localhost:8000/api';

type StringOrArray = string | Array<string>;

const API_GET_AUTH = "API/GET-AUTH";
const API_POST = "API/POST";
const API_POST_AUTH = "API/POST-AUTH";

function makeUrl(urlTail: StringOrArray): string {
    let urlSegments = [BASE_URL];
    if (Array.isArray(urlTail)) {
        urlSegments = urlSegments.concat(urlTail);
    } else {
        urlSegments.push(urlTail);
    }
    return urlSegments.join('/');
}

type HttpAction = {
    type: string,
    payload: {
        url: string,
        body?: Object
    }
};

function httpRequest(method: 'POST'|'GET', url: string, jwt: ?string = null, body: ?Object = null): Promise<Object> {
    const options: Object = {
        method,
        url,
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
export const httpGetAuth = (urlTail: StringOrArray): HttpAction => ({
    type: API_GET_AUTH,
    payload: {
        url: makeUrl(urlTail)
    }
});

export const httpPostAuth = (urlTail: StringOrArray, body: Object): HttpAction => ({
    type: API_POST_AUTH,
    payload: {
        url: makeUrl(urlTail),
        body
    }
});

export const httpPost = (urlTail: StringOrArray, body: Object): HttpAction => ({
    type: API_POST,
    payload: {
        url: makeUrl(urlTail),
        body
    }
});

export const apiMiddleware = (store: Store) => (next: Dispatch<HttpAction>) => (action: HttpAction) => {
    if (action.type === API_GET_AUTH) {
        return httpRequest('GET', action.payload.url, getUserJWT());
    } else if (action.type === API_POST_AUTH) {
        return httpRequest('POST', action.payload.url, getUserJWT(), action.payload.body);
    } else if (action.type === API_POST) {
        return httpRequest('POST', action.payload.url, null, action.payload.body);
    } else {
        return next(action);
    }
};
