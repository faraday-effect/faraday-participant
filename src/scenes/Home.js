// @flow

import React from 'react';
import Link from "redux-first-router-link";
import {LOGIN_SCENE} from "../reducers/scenes";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

const Home = () => (
    <div>
        <Header/>
        <section className="section">
            <Link className="button is-primary is-rounded" to={{type: LOGIN_SCENE}}>Log In</Link>
        </section>
        <Footer/>
    </div>
);

export default Home;
