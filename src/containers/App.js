// @flow

import React from 'react';
import '../css/zenburn.css';
import 'bulma/css/bulma.css';

import faradaySignature from '../assets/faraday-signature.png';

const Home = () => (<div><h2>Home</h2></div>);

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">Faraday</div>
                    <div className="navbar-item">Home</div>
                    <div className="navbar-item">Sign Up</div>
                    <div className="navbar-item">Dashboard</div>
                    <div className="navbar-item">Topics</div>
                    <div className="navbar-item">Quizzes</div>
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
            <Home/>
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
