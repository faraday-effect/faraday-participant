import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Segment } from 'semantic-ui-react';

import Quiz from './components/Quiz';

import './App.css';
const style = {
    h1: { marginTop: '1em' }
};

class App extends Component {
    render() {
        return (
            <div>
                <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>
                <Container text>
                    {this.props.quizzes.map(quiz => (
                        <Segment.Group key={quiz.key}>
                            <Quiz quiz={quiz}/>
                        </Segment.Group>
                    ))}
                </Container>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.cells.map(cellKey => state.quizzes[cellKey])
    };
}

export default connect(mapStateToProps)(App)

