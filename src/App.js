// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container } from 'semantic-ui-react';

import Quiz from './components/Quiz';
import {fetchQuizzes} from './actions/quiz';

import Topic from './components/Topic';
import {fetchTopic} from './actions/topic';
import type {TopicType} from './actions/topic';

import './App.css';
const style = {
    h1: { marginTop: '1em' }
};

type AppProps = {
    quizzes: Array<Quiz>,
    topics: Array<TopicType>,
    fetchTopic: (uid: string) => TopicType
};

class App extends Component<AppProps> {
    componentDidMount() {
        // TODO: This can't be right; should fetch entire content.
        // TODO: Use a Saga?

        //this.props.fetchQuizzes();
        //this.props.fetchTalks();
        //this.props.fetchTalkViews('5a5bbd13ba590a9be212bc04', { left: 'podium', right: 'projector' });
        this.props.fetchTopic('flask-templates');
    }
    
    findQuiz(quizKey) {
        const quiz = this.props.quizzes.find(quiz => quiz.key === quizKey);
        console.log(quizKey, this.props.quizzes, quiz);
        return quiz;
    }

    render() {
        return (
            <div>
                <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>\
                <Container text>
                    {this.props.topics.map(topic =>
                        <Topic key={topic.uid} topic={topic}/>
                    )}
                </Container>
            </div>
        );
    }
}

// TODO: This really isn't doing much.
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchQuizzes, fetchTopic})(App);
