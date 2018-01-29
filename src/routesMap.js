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
            const {
                type: currentType,
                prev: {type: previousType},
                payload: {topicId, sectionType, sectionId, segmentType, segmentId}
            } = getState().location;

            try {
                // Only load data if we've not been on the same route; this allows the drill-down
                // behavior to work properly without reloading after each click.
                const topics = previousType !== currentType
                    ? await request({url: apiUrl('topics'), json: true})
                    : getState().topics.allTopics;

                // In either case, want to trigger this action
                // so that the view state is updated properly.
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
