import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react'

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';
import '../css/zenburn.css';

import rootReducer from '../reducers/rootReducer'
import TopMenu from '../components/TopMenu';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const Users = () => (
    <div>
        <h2>Users</h2>
    </div>
);

const Dashboard = () => (
    <div>
        <h2>Dashboard</h2>
    </div>
);

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <Container text>
                    <TopMenu/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/dashboard" component={Dashboard}/>
                </Container>
            </div>
        </Router>
    </Provider>
);

export default App;

// import { connect } from 'react-redux';
//import { Header, Container } from 'semantic-ui-react';

// import Quiz from './components/Quiz';
// import {fetchQuizzes} from './actions/quiz';
//
// import Topic from './components/Topic';
// import {fetchTopic} from './actions/topic';
// import type {TopicType} from './actions/topic';

// const style = {
//     h1: { marginTop: '1em' }
// };
//
// type AppProps = {
//     quizzes: Array<Quiz>,
//     topics: Array<TopicType>,
//     fetchTopic: (uid: string) => TopicType
// };
//
// class App extends Component<AppProps> {
//     componentDidMount() {
//         // TODO: This can't be right; should fetch entire content.
//         // TODO: Use a Saga?
//
//         //this.props.fetchQuizzes();
//         //this.props.fetchTalks();
//         //this.props.fetchTalkViews('5a5bbd13ba590a9be212bc04', { left: 'podium', right: 'projector' });
//         this.props.fetchTopic('flask-templates');
//     }
//
//     findQuiz(quizKey) {
//         const quiz = this.props.quizzes.find(quiz => quiz.key === quizKey);
//         console.log(quizKey, this.props.quizzes, quiz);
//         return quiz;
//     }
//
//     render() {
//         return (
//             <div>
//                 <Header as="h1" style={style.h1} content="Faraday" textAlign="center"/>\
//                 <Container text>
//                     {this.props.topics.map(topic =>
//                         <Topic key={topic.uid} topic={topic}/>
//                     )}
//                 </Container>
//             </div>
//         );
//     }
// }
//
// // TODO: This really isn't doing much.
// function mapStateToProps(state) {
//     return state;
// }
//
// export default connect(mapStateToProps, {fetchQuizzes, fetchTopic})(App);
