// @flow

import React from 'react';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

export const Logout = () => (
    <div>
        <Header/>
        <h1 className="title is-1">Logged Out</h1>
        <Footer/>
    </div>
);
