// @flow

import request from "request";

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

function httpRequest(requestConfig: Object): Promise<Object> {
    return new Promise((resolve, reject) =>
        request(requestConfig, (error, response, body) => {
            if (error) {
                return reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    return resolve({
                        ok: true,
                        statusCode: response.statusCode,
                        payload: body
                    });
                } else {
                    return resolve({
                        ok: false,
                        statusCode: response.statusCode,
                        payload: body
                    });
                }
            }
        })
    );
}

export function httpPost(urlTail: StringOrArray, payload: Object): Promise<Object> {
    return httpRequest({
        method: 'POST',
        url: makeUrl(urlTail),
        body: payload,
        json: true
    });
}

export function httpGet(urlTail: StringOrArray): Promise<Object> {
    return httpRequest({
        method: 'GET',
        url: makeUrl(urlTail),
        json: true
    })
}
