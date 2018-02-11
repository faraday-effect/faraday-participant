// @flow

import React from 'react';
import Link from 'redux-first-router-link';
import {LOGOUT_SCENE} from "../../reducers/scenes";
import FlashMessage from "../../components/FlashMessage";

export const NavBar = () => (
    <div>
        <section className="section">
            <nav className="navbar is-primary">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            Faraday
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link to={{type: LOGOUT_SCENE}}>Logout</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
        <FlashMessage/>
    </div>
);
