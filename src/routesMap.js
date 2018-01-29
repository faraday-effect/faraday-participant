// @flow

import {HOME_PAGE, SIGN_UP_PAGE, TOPICS_PAGE, QUIZZES_PAGE} from './reducers/page';
import request from "request-promise";
import {apiUrl} from "./reducers/common";

import {FETCH_ALL_FAIL, FETCH_ALL_OKAY} from './reducers/topics';

const routesMap = {
    [HOME_PAGE]: '/',

    [QUIZZES_PAGE]: '/quizzes',

    [SIGN_UP_PAGE]: '/sign-up',

    [TOPICS_PAGE]: {
        path: '/topics/:topicId?/:sectionType?/:sectionId?/:segmentType?/:segmentId?',
        thunk: async (dispatch: Function, getState: any) => {
            const {topicId, sectionType, sectionId, segmentType, segmentId} = getState().location.payload;

            try {
                const topics = await request({
                    url: apiUrl('topics'),
                    json: true
                });
                dispatch({
                    type: FETCH_ALL_OKAY,
                    payload: {topics, topicId, sectionType, sectionId, segmentType, segmentId}
                });
            } catch (err) {
                dispatch({
                    type: FETCH_ALL_FAIL,
                    payload: `Unable to get topics from server (${err})`
                });
            }
        }
    }
};

export default routesMap;
