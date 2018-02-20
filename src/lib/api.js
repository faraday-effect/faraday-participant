// @flow

import request from "request";
import {getUserJWT} from "../sagas/user";

const BASE_URL = 'http://localhost:8000/api';

type StringOrArray = string | Array<string>;

function makeUrl(urlTail: StringOrArray): string {
    let urlSegments = [BASE_URL];
    if (Array.isArray(urlTail)) {
        urlSegments = urlSegments.concat(urlTail);
    } else {
        urlSegments.push(urlTail);
    }
    return urlSegments.join('/');
}

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
                return reject({
                    error: true,
                    payload: error
                });
            } else {
                return resolve({
                    error: response.statusCode < 200 || response.statusCode > 299,
                    payload: body,
                    meta: {
                        statusCode: response.statusCode
                    }
                });
            }
        })
    );
}

// Action creators
export const httpGetAuth = (urlTail: StringOrArray) =>
    httpRequest('GET', makeUrl(urlTail), getUserJWT());

export const httpPostAuth = (urlTail: StringOrArray, body: Object) =>
    httpRequest('POST', makeUrl(urlTail), getUserJWT(), body);

export const httpPost = (urlTail: StringOrArray, body: Object) =>
    httpRequest('POST', makeUrl(urlTail), null, body);
