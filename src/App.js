// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import Quiz from './components/Quiz';
import type { TalkType } from './components/Talk';
// import Talk from './components/Talk';
import TalkViews from './components/Talk';
import { fetchQuizzes, fetchTalks, fetchTalkViews } from './actions';

import './App.css';
const style = {
    h1: { marginTop: '1em' }
};

type AppProps = {
    fetchTalks: any => void,
    fetchTalkViews: (string, {[string]: string}) => any;
    quizzes: Array<Quiz>,
    talks: Array<TalkType>
};

class App extends Component<AppProps> {
    componentDidMount() {
        // TODO: This can't be right; should fetch entire content.
        // TODO: Use a Saga?

        //this.props.fetchQuizzes();
        //this.props.fetchTalks();
        this.props.fetchTalkViews('5a5bbd13ba590a9be212bc04', { left: 'podium', right: 'projector' });
    }
    
    findQuiz(quizKey) {
        const quiz = this.props.quizzes.find(quiz => quiz.key === quizKey);
        console.log(quizKey, this.props.quizzes, quiz);
        return quiz;
    }

    render() {
        return (
            <div>
                <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>
                <TalkViews/>
            </div>
        );
    }

    // renderOld() {
    //     return (
    //         <div>
    //             <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>
    //             <Container text>
    //                 {this.props.cells.map(cell => (
    //                     <Segment.Group key={cell.key}>
    //                         <Quiz quiz={this.findQuiz(cell.key)}/>
    //                     </Segment.Group>
    //                 ))}
    //                 {this.props.talks.map(talk => (
    //                     <Talk talk={talk}/>
    //                 ))}
    //             </Container>
    //         </div>
    //     );
    // }
}

// TODO: This really isn't doing much.
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchQuizzes, fetchTalks, fetchTalkViews})(App);
