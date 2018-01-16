import {topicActionType} from '../actions/topic';

export default function topics(state = [], action) {
    switch (action.type) {
        case topicActionType.FETCH_TOPIC_SUCCEEDED:
            return [ action.payload ];
        default:
            return state;
    }
}
