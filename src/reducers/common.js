// @flow

const BASE_URL = 'http://localhost:8000/api';

export function apiUrl(...pathSegments: Array<string>) {
    return [BASE_URL, ...pathSegments].join('/');
}
