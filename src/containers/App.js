// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Location} from 'redux-first-router';
import Link from 'redux-first-router-link';

import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import SignupPage from './SignupPage';
import Page from './Page';

import faradaySignature from '../assets/faraday-signature.png';

import TopicsPage from './TopicsPage';
import Quizzes from './QuizzesPage';
import {selectTopic} from "../reducers/topics";

import {HOME, TOPICS, SIGN_UP, QUIZZES} from '../routesMap';

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">Faraday</div>
                    <div className="navbar-item">
                        <Link to={{ type: HOME}}>Home</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{ type: SIGN_UP}}>Sign Up</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{ type: TOPICS}}>Topics</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: QUIZZES}}>Quizzes</Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">Logout</div>
                </div>
            </div>
        </nav>
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

class App extends React.Component<*> {
    render () {
        return (
            <div>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <Page/>
                    </div>
                </section>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
