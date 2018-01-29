// @flow

import React from 'react';
import {connect} from 'react-redux';

import Link from 'redux-first-router-link';

import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import Page from './Page';

import faradaySignature from '../assets/faraday-sig-small.png';

import {HOME_PAGE, TOPICS_PAGE, SIGN_UP_PAGE, QUIZZES_PAGE} from '../reducers/page';

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">Faraday</div>
                    <div className="navbar-item">
                        <Link to={{type: HOME_PAGE}}>Home</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: SIGN_UP_PAGE}}>Sign Up</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: TOPICS_PAGE}}>Topics</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: QUIZZES_PAGE}}>Quizzes</Link>
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
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <h4 className="title is-4">Faraday</h4>
                    </div>
                    <div className="column">
                        Actionable Educational Intelligence
                    </div>
                    <div className="column">
                        <img className="is-pulled-right" src={faradaySignature} alt="Faraday's signature"/>
                    </div>
                </div>
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
