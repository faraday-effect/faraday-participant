// @flow

import React from 'react';
import {connect} from 'react-redux';

import Link from 'redux-first-router-link';
import faradaySignature from '../assets/faraday-sig-small.png';


import FlashMessage from '../components/FlashMessage';

import ProjectorPage from './Projector';
import QuizzesPage from '../modules/quiz/QuizzesPage';
import SignupPage from './Signup';
import TopicsPage from './TopicsPage';

import {PROJECTOR_SCENE, TOPICS_SCENE, SIGNUP_SCENE} from './reducer';

const NavBar = () => (
    <section className="section">
        <nav className="navbar is-light">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <Link to={{type: SIGNUP_SCENE}}>Sign Up</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: PROJECTOR_SCENE}}>Projector</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to={{type: TOPICS_SCENE}}>Topics</Link>
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

type PageStyle = "normal" | "empty";
type PageInfo = {[string]: {container: any, style: PageStyle}};

const pageConfig: PageInfo = {
    ProjectorPage: {container: ProjectorPage, style: "empty"},
    QuizzesPage: {container: QuizzesPage, style: "normal"},
    SignupPage: {container: SignupPage, style: "normal"},
    TopicsPage: {container: TopicsPage, style: "normal"}
};

class App extends React.Component<*> {
    render () {
        const pageInfo = pageConfig[this.props.page];
        const Page = pageInfo.container;

        if (pageInfo.style === "empty") {
            return (
                <div>
                    <FlashMessage/>
                    <Page/>
                </div>
            );
        } else {
            return (
                <div>
                    <NavBar/>
                    <FlashMessage/>
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
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
