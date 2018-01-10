export default function notes(state = [], action) {
    switch (action.type) {
        case 'FETCH_NOTES_SUCCEEDED':
            return action.payload.notes;
        default:
            return state;
    }
}
