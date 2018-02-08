import {FETCH_TOPIC_OKAY} from "./topics";

export default (state = false, action = {}) => {
    switch(action.type) {
        case FETCH_TOPIC_OKAY:
            return false;
        default:
            return state;
    }
};
