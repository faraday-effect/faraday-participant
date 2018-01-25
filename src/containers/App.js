// @flow

import React from 'react';
import {connect} from 'react-redux';

import type {Location} from 'redux-first-router';
import Link from 'redux-first-router-link';

import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import {ShowObject} from "../components/util";
import SignupPage from './SignupPage';

import faradaySignature from '../assets/faraday-signature.png';

import Topics from './Topics';
import Quizzes from './Quizzes';

const Home = () => (
    <div>
        <h1 className="title is-1">Welcome to Faraday</h1>
    </div>
);

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">Faraday</div>
                    <div className="navbar-item">
                        <Link to={{ type: 'HOME'}}>
                            Home
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{ type: 'SIGN_UP' }}>
                            Sign Up
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{ type: 'TOPICS'}}>
                            Topics
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: 'QUIZZES'}}>
                            Quizzes
                        </Link>
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

type Props = {
    location: Location
}

function switcher(props: Props) {
    switch(props.location.type) {
        case 'HOME':
            return <Home/>;
        case 'SIGN_UP':
            return <SignupPage/>;
        case 'TOPICS':
            return <Topics/>;
        case 'QUIZZES':
            return <Quizzes/>;
        default:
            return <p>FIX ME</p>;
    }
}

class App extends React.Component<Props> {
    render () {
        return (
            <div>
                <NavBar/>

                <section className="section">
                    <div className="container">
                        {switcher(this.props)}
                    </div>
                </section>

                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
    goToSignUp: () => dispatch({type: "SIGN_UP"})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
