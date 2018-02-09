// @flow

import React from 'react';
import Link from 'redux-first-router-link';
import {SIGNUP_SCENE, PROJECTOR_SCENE, TOPICS_SCENE} from "../../reducers/scenes";

export const NavBar = () => (
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
