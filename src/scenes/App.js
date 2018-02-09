// @flow

import React from 'react';
import {connect} from 'react-redux';

import FlashMessage from '../components/FlashMessage';

import ProjectorPage from './Projector';
import QuizzesPage from '../modules/quiz/QuizzesPage';
import SignupPage from './Signup';
import TopicsPage from './TopicsPage';
import {NavBar} from "./components/NavBar";
import {Footer} from "./components/Footer";



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
