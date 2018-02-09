// @flow

import request from "request";
import {authenticateUser} from "../reducers/user";

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

type RequestConfig = {
    method: 'POST' | 'GET',
    url: string,
    authRequired: boolean,
    body?: Object
}

function httpRequest(requestConfig: RequestConfig): Promise<Object> {
    const finalConfig = {
        ...requestConfig,
        json: true
    };

    if (finalConfig.authRequired) {
        authenticateUser();
    }

    return new Promise((resolve, reject) =>
        request(finalConfig, (error, response, body) => {
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

export function httpGet(urlTail: StringOrArray, authRequired: boolean = true): Promise<Object> {
    return httpRequest({
        method: 'GET',
        authRequired,
        url: makeUrl(urlTail)
    })
}

export function httpPost(urlTail: StringOrArray, payload: Object, authRequired: boolean = true): Promise<Object> {
    return httpRequest({
        method: 'POST',
        url: makeUrl(urlTail),
        authRequired,
        body: payload
    });
}
