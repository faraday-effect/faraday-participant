// @flow

export const HOME = 'ROUTE/HOME';
export const SIGN_UP = 'ROUTE/SIGN-UP';
export const TOPICS = 'ROUTE/TOPICS';
export const QUIZZES = 'ROUTE/QUIZZES';

const routesMap = {
    [HOME]: '/',
    [SIGN_UP]: '/sign-up',
    [TOPICS]: '/topics/:topicId?',
    [QUIZZES]: '/quizzes'
};

export default routesMap;
