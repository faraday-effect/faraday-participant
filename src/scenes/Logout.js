// @flow

import React from 'react';
import {Footer} from "./components/Footer";
import {NavBar} from "./components/NavBar";

const Logout = () => (
    <div>
        <NavBar/>
        <section className="section">
            <div className="container">
                <h1 className="title is-1">Logged Out</h1>
            </div>
        </section>
        <Footer/>
    </div>
);

export default Logout;