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