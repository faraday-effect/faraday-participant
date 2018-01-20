// @flow

import React from 'react';
import {Link, Route} from 'react-router-dom';
import '../css/zenburn.css';

import Topics from '../containers/Topics';
import Quizzes from '../containers/Quizzes';
import Signup from '../containers/Signup';

const Home = () => (<div><h2>Home</h2></div>);
const Dashboard = () => (<div><h2>Dashboard</h2></div>);

const App = () => (
    <div>
        <section className="section">
            <nav className="navbar is-primary has-shadow">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">Faraday</div>
                        <div className="navbar-item"><Link to="/">Home</Link></div>
                        <div className="navbar-item"><Link to="/users/signup">Sign Up</Link></div>
                        <div className="navbar-item"><Link to="/dashboard">Dashboard</Link></div>
                        <div className="navbar-item"><Link to="/topics">Topics</Link></div>
                        <div className="navbar-item"><Link to="/quizzes">Quizzes</Link></div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">Logout</div>
                    </div>
                </div>
            </nav>
        </section>

        <section className="section">
            <div className="container">
                <Route exact path="/" component={Home}/>
                <Route path="/users/signup" component={Signup}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/topics" component={Topics}/>
                <Route path="/quizzes" component={Quizzes}/>
            </div>
        </section>

        <section className="section">
            <footer className="footer">
                <div className="content has-text-centered">
                    This is Faraday
                </div>
            </footer>
        </section>
    </div>
);

export default App;
