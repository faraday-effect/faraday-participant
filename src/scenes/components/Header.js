// @flow

import React from 'react';
import FlashMessage from "../../components/FlashMessage";

export const Header = () => (
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">
                        Faraday
                    </h1>
                </div>
            </div>
        </section>
        <FlashMessage/>
    </div>
);
