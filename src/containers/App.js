// @flow

import React from 'react';
import {Link, Route} from 'react-router-dom';
import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import faradaySignature from '../assets/faraday-signature.png';

import Topics from '../containers/Topics';
import Quizzes from '../containers/Quizzes';
import SignupPage from './SignupPage';

const Home = () => (<div><h2>Home</h2></div>);

/*
const Dashboard2 = () => (
    <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-head">
            Foo
        </div>
        <div className="hero-body">
            <div className="tile is-ancestor">
                <div className="tile">
                    <div className="container">
                        <h1 className="title">Welcome to SYS 394</h1>
                        <h2 className="subtitle">Information Systems Design</h2>
                    </div>
                </div>
                <div className="tile">
                    <div className="container">
                        <ul>
                            <li>Fred</li>
                            <li>Zelda</li>
                            <li>Ziffle</li>
                            <li>Peru</li>
                            <li>Estranged</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="hero-head">
            Bar
        </div>
    </section>
);
*/

const Dashboard = () => (
    <section className="hero is-fullheight is-primary is-bold">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">Welcome to SYS 394</h1>
                <h2 className="subtitle">Information Systems Design</h2>
            </div>
            <div className="container">
                <h1>Today's Class</h1>
            </div>
        </div>
    </section>
);

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
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
);

const Scenes = () => (
    <section className="section">
        <div className="container">
            <Route exact path="/" component={Home}/>
            <Route path="/users/signup" component={SignupPage}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/quizzes" component={Quizzes}/>
        </div>
    </section>
);

const Footer = () => (
    <section className="section">
        <footer className="footer">
            <div className="content has-text-centered">
                <img src={faradaySignature} alt="Faraday's signature"/>
            </div>
        </footer>
    </section>
);

const App = () => (
    <div>
        <NavBar/>
        <Scenes/>
        <Footer/>
    </div>
);

export default App;
