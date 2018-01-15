
import request from 'request-promise';
import * as _ from 'lodash';
import Promise from 'bluebird';

export function respondToQuiz(response) {
    return {
        type: 'RESPOND_TO_QUIZ',
        payload: response
    }
}

export function answerQuestion(quizKey, name, value) {
    return {
        type: 'ANSWER_QUESTION',
        payload: {
            quizKey,
            name,
            value
        }
    };
}

export function fetchQuizzesSucceeded(quizzes) {
    return {
        type: 'FETCH_QUIZZES_SUCCEEDED',
        payload: {
            quizzes
        }
    }
}

export function fetchQuizzes() {
    return dispatch => {
        request('http://localhost:8000/api/quizzes')
            .then(response => dispatch(fetchQuizzesSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}

export function fetchTalksSucceeded(talks) {
    return {
        type: 'FETCH_TALKS_SUCCEEDED',
        payload: {talks}
    }
}

export function fetchTalks(destination='podium', allSegments=false) {
    return dispatch => {
        request({
            url: `http://localhost:8000/api/talks`,
            qs: {
                destination: destination,
                allSegments: allSegments
            }
        })
            .then(response => dispatch(fetchTalksSucceeded(JSON.parse(response))))
            .catch(err => console.error(err));
    };
}

const fetchTalkView = (talkId, destination) => {
    const options = {
        url: `http://localhost:8000/api/talks/${talkId}`,
        qs: {
            destination: destination,
            allSegments: true
        },
        json: true
    };
    console.log('REQUESTING', options);
    return request(options);
};


export function fetchTalkViewsSucceeded(talkViews) {
    return {
        type: 'FETCH_TALK_VIEWS_SUCCEEDED',
        payload: {talkViews}
    };
}

// fetchTalkViews('55555555', { left: 'podium', right: 'projector' })
export function fetchTalkViews(talkId, viewMap) {
    const keyValuePairs = _.toPairs(viewMap);
    return dispatch => {
        Promise.map(keyValuePairs, pair => fetchTalkView(talkId, pair[1]))
            .then(results => dispatch(fetchTalkViewsSucceeded(
                _.fromPairs(
                    _.map(_.range(keyValuePairs.length),
                        idx => [keyValuePairs[idx][0], results[idx]]
                    )
                )
            )));
    }
}

