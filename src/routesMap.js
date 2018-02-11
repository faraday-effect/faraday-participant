// @flow

import {
    COURSES_SCENE,
    LOGIN_SCENE,
    LOGOUT_SCENE,
    PROJECTOR_SCENE,
    SIGNUP_SCENE
} from "./reducers/scenes";

const routesMap = {
    [COURSES_SCENE]: '/courses',
    [LOGIN_SCENE]: '/',
    [LOGOUT_SCENE]: '/logout',
    [PROJECTOR_SCENE]: '/projector/:topicId',
    [SIGNUP_SCENE]: '/signup'
};

export default routesMap;
