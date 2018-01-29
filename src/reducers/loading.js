import {TOPICS_PAGE} from './pages';
import {FETCH_TOPIC_OKAY} from "./topics";

export default (state = false, action = {}) => {
    switch(action.type) {
        case TOPICS_PAGE:
            return true;
        case FETCH_TOPIC_OKAY:
            return false;
        default:
            return state;
    }
};
