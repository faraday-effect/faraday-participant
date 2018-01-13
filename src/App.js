import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Segment } from 'semantic-ui-react';

import Quiz from './components/Quiz';
import Note from './components/Note';
import { fetchCells, fetchQuizzes, fetchNotes } from './actions';

import './App.css';
const style = {
    h1: { marginTop: '1em' }
};

class App extends Component {
    componentDidMount() {
        // TODO: This can't be right; should fetch entire content.
        // TODO: Use a Saga?

        //this.props.fetchQuizzes();
        //this.props.fetchCells();
        this.props.fetchNotes();
    }
    
    findQuiz(quizKey) {
        const quiz = this.props.quizzes.find(quiz => quiz.key === quizKey);
        console.log(quizKey, this.props.quizzes, quiz);
        return quiz;
    }

    render() {
        console.log(this);
        return (
            <div>
                <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>
                <Container text>
                    {this.props.cells.map(cell => (
                        <Segment.Group key={cell.key}>
                            <Quiz quiz={this.findQuiz(cell.key)}/>
                        </Segment.Group>
                    ))}
                    {this.props.notes.map(note => {
                        console.log(note);
                        return (
                            <Segment.Group key={note.key}>
                                <Note note={note}/>
                            </Segment.Group>
                        )
                    })}
                </Container>
            </div>

        );
    }
}

// TODO: This really isn't doing much.
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {fetchCells, fetchQuizzes, fetchNotes})(App);
