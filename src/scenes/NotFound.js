// @flow

import React from 'react';
import {Footer} from "./components/Footer";
import {Header} from "./components/Header";

const NotFound = () => (
    <div>
        <Header/>
        <section className="hero is-warning">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">Bummer</h1>
                    <h2 className="title is-3">The page you're looking for doesn't appear to exist</h2>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
);

export default NotFound;
