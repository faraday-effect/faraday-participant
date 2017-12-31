import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Segment } from 'semantic-ui-react';

import { Quiz } from './components/Quiz';

import './App.css';
const style = {
    h1: { marginTop: '1em' }
};

class App extends Component {
    handleQuizResponse(response) {
        console.log('QUIZ RESPONSE', response);
    }

    render() {
        return (
            <div>
                <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>
                <Container text>
                    <Segment.Group>
                        <Quiz
                            quiz={this.props.quiz}
                            onResponse={this.handleQuizResponse}/>
                    </Segment.Group>
                </Container>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.quiz
    }
}

export default connect(mapStateToProps)(App);
