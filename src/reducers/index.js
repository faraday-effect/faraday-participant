// @flow

import { combineReducers } from 'redux'
import topicsReducer from './topics';

export default combineReducers({
    topics: topicsReducer
});
