// @flow

import React from 'react';
import {connect} from 'react-redux';

import Link from 'redux-first-router-link';

import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import Page from './Page';

import faradaySignature from '../assets/faraday-signature.png';

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
