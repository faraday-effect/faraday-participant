// @flow

import {HOME_SCENE, SIGNUP_SCENE, LOGIN_SCENE, PROJECTOR_SCENE, COURSES_SCENE} from "./reducers/scenes";

const routesMap = {
    [HOME_SCENE]: '/',
    [SIGNUP_SCENE]: '/signup',
    [LOGIN_SCENE]: '/login',
    [PROJECTOR_SCENE]: '/projector/:topicId',
    [COURSES_SCENE]: '/courses',
    // [QUIZZES_SCENE]: '/quizzes',
    // [TOPICS_SCENE]: '/topics/:topicId?/:sectionType?/:sectionId?/:segmentType?/:segmentId?'
};

export default routesMap;

/*
const projectorThunk = async (dispatch: Function, getState: any) => {
    const topicId = getState().location.payload.topicId;

    try {
        const topic = await httpGet(['topics', topicId]);
        dispatch({
            type: FETCH_PROJECTOR_OKAY,
            payload: topic.payload
        });
    } catch (err) {
        dispatch({
            type: FLASH_SET_MESSAGE,
            severity: 'error',
            payload: `Unable to get topics from server (${err})`
        });
    }
};

const topicsThunk = async (dispatch: Function, getState: any) => {
    const {
        type: currentType,
        prev: {type: previousType},
        payload: {topicId, sectionType, sectionId, segmentType, segmentId}
    } = getState().location;

    try {
        // Only load data if we've not been on the same route; this allows the drill-down
        // behavior to work properly without reloading after each click.
        let topics = [];
        if (previousType !== currentType) {
            const response = await httpGet('topics');
            topics = response.payload;
        } else {
            topics = getState().topics.allTopics;
        }

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
};
*/
