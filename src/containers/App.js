// @flow

import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {Container, Menu} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import '../css/zenburn.css';

import Topics from '../containers/Topics';
import Quizzes from '../containers/Quizzes';

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
    <Router>
        <div>
            <Container text>
                <Menu>
                    <Menu.Item header>Faraday</Menu.Item>
                    <Menu.Item><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item><Link to="/users">Users</Link></Menu.Item>
                    <Menu.Item><Link to="/dashboard">Dashboard</Link></Menu.Item>
                    <Menu.Item><Link to="/topics">Topics</Link></Menu.Item>
                    <Menu.Item><Link to="/quizzes">Quizzes</Link></Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item as='a'>Logout</Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/quizzes" component={Quizzes}/>
            </Container>
        </div>
    </Router>
);

export default App;
