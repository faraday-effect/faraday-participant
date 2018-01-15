export function talks(state = [], action) {
    switch (action.type) {
        case 'FETCH_TALKS_SUCCEEDED':
            return action.payload.talks;
        default:
            return state;
    }
}

export function talkViews(state = {}, action) {
    switch(action.type) {
        case 'FETCH_TALK_VIEWS_SUCCEEDED':
            return action.payload.talkViews;
        default:
            return state;
    }
}
