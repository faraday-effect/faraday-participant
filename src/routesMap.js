// @flow

import {SIGN_UP_PAGE, TOPICS_PAGE, QUIZZES_PAGE, PROJECTOR_PAGE} from './reducers/pages';
import request from "request-promise";
import {apiUrl} from "./reducers/common";

import {FETCH_TOPIC_OKAY} from './reducers/topics';
import {FLASH_SET_MESSAGE} from "./reducers/flash";
import {FETCH_PROJECTOR_OKAY} from "./modules/lecture/reducer";

const routesMap = {
    [PROJECTOR_PAGE]: {
        path: '/projector/:topicId',
        thunk: async (dispatch: Function, getState: any) => {
            const topicId = getState().location.payload.topicId;

            try {
                const topic = await request({
                    url: apiUrl('topics', topicId),
                    json: true
                });
                dispatch({
                    type: FETCH_PROJECTOR_OKAY,
                    payload: topic
                });
            } catch (err) {
                dispatch({
                    type: FLASH_SET_MESSAGE,
                    severity: 'error',
                    payload: `Unable to get topics from server (${err})`
                });
            }
        }
    },

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
                    type: FETCH_TOPIC_OKAY,
                    payload: {topics, topicId, sectionType, sectionId, segmentType, segmentId}
                });
            } catch (err) {
                dispatch({
                    type: FLASH_SET_MESSAGE,
                    severity: 'error',
                    payload: `Unable to get topics from server (${err})`
                });
            }
        }
    }
};

export default routesMap;
