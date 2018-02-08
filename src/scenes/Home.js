// @flow

import React from 'react';
import Link from "redux-first-router-link";
import {LOGIN_SCENE} from "./reducer";

const Home = () => (
    <div>
        <h1>Welcome, Starfighter</h1>
        <Link to={{type: LOGIN_SCENE}}>Log In</Link>
    </div>
);

export default Home;
