// @flow

import React, {Component} from 'react';

import LogInForm from '../forms/LogInForm';

const SignIn = () => (
    <div>
        <section className="hero is-primary">
            <div className="container has-text-centered">
                <div className="hero-body">
                    <h1 className="title">
                        Welcome to Faraday
                    </h1>
                </div>
            </div>
        </section>
        <section className="section">
            <LogInForm/>
        </section>
    </div>
);

export default SignIn;
