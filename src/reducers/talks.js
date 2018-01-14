export default function talks(state = [], action) {
    switch (action.type) {
        case 'FETCH_TALKS_SUCCEEDED':
            return action.payload.talks;
        default:
            return state;
    }
}
