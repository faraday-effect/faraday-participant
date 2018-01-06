export default function cells(state = [], action) {
    switch (action.type) {
        case 'FETCH_CELLS_SUCCEEDED':
            return action.payload.cells;
        default:
            return state;
    }
}
