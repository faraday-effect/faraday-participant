import {TOPICS_PAGE} from './page';
import {FETCH_ALL_OKAY} from "./topics";

export default (state = false, action = {}) => {
    switch(action.type) {
        case TOPICS_PAGE:
            return true;
        case FETCH_ALL_OKAY:
            return false;
        default:
            return state;
    }
};
