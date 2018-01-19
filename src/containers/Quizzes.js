// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchAll} from "../reducers/quizzes";

import Quiz from '../components/quiz/Quiz';
import type {QuizType} from "../components/quiz/Quiz";

type Props = {
    quizzes: Array<QuizType>,
    fetchAll: () => Array<QuizType>
}

class Quizzes extends Component<Props> {
    componentDidMount() {
        this.props.fetchAll();
    }

    handleSubmit = (responseMap: { [string]: string }) => {
        console.log("QUIZ RESPONSES", responseMap);
    };

    render () {
        return (
            <div>
                {_.map(this.props.quizzes, quiz =>
                    <Quiz key={quiz._id}
                          quiz={quiz}
                          onSubmit={this.handleSubmit}
                    />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    quizzes: state.quizzes
});

export default connect(mapStateToProps, {fetchAll})(Quizzes);
