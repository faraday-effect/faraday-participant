// @flow

import React from 'react';
import {connect} from 'react-redux';

import HomePage from './HomePage';
import QuizzesPage from './QuizzesPage';
import SignupPage from './SignupPage';
import TopicsPage from './TopicsPage';

const pages = {
    HomePage: HomePage,
    SignupPage: SignupPage,
    TopicsPage: TopicsPage,
    QuizzesPage: QuizzesPage
};

const Page = ({ page }) => {
    const Page = pages[page];
    return Page ? <Page /> : null
};

const mapStatetoProps = ({ page }) => ({ page });

export default connect(mapStatetoProps)(Page);
