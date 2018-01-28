// @flow

import {HOME_PAGE, SIGN_UP_PAGE, TOPICS_PAGE, QUIZZES_PAGE} from './reducers/page';

const routesMap = {
    [HOME_PAGE]: '/',

    [QUIZZES_PAGE]: '/quizzes',

    [SIGN_UP_PAGE]: '/sign-up',

    [TOPICS_PAGE]: '/topics/:topicId?/:sectionId?/:segmentId?'
};

export default routesMap;
