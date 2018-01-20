// @flow

import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../css/zenburn.css';

import Topics from '../containers/Topics';
import Quizzes from '../containers/Quizzes';

const Home = () => (<div><h2>Home</h2></div>);
const Users = () => (<div><h2>Users</h2></div>);
const Dashboard = () => (<div><h2>Dashboard</h2></div>);

const App = () => (
    <Router>
        <section className="section">
            <nav className="navbar is-primary">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">Faraday</div>
                        <div className="navbar-item"><Link to="/">Home</Link></div>
                        <div className="navbar-item"><Link to="/users">Users</Link></div>
                        <div className="navbar-item"><Link to="/dashboard">Dashboard</Link></div>
                        <div className="navbar-item"><Link to="/topics">Topics</Link></div>
                        <div className="navbar-item"><Link to="/quizzes">Quizzes</Link></div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">Logout</div>
                    </div>
                </div>
            </nav>

            <div className="container">
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/quizzes" component={Quizzes}/>
            </div>
        </section>
    </Router>
);

export default App;
