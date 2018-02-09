// @flow

import React from 'react';
import Link from "redux-first-router-link";
import {HOME_SCENE} from "../../reducers/scenes";

export const Header = () => (
    <section className="hero is-primary">
        <div className="hero-body">
            <div className="container">
                <h1 className="title is-1">
                    <Link to={{type: HOME_SCENE}}>Faraday</Link>
                </h1>
            </div>
        </div>
    </section>
);
