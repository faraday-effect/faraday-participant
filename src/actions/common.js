export const BASE_URL = 'http://localhost:8000/api';

export default function apiUrl(...pathSegments) {
    return [BASE_URL, ...pathSegments].join('/');
}
