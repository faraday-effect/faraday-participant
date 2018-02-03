// @flow

import React from 'react';

import LoginForm from '../forms/LoginForm';
import {connect} from "react-redux";

const onSubmit = (...args) => {
    console.log("ON SUBMIT", args);
};

const Login = () => (
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
            <div className="columns">
                <div className="column is-one-third is-offset-one-third">
                    <h1 className="subtitle is-3">Please Log In</h1>
                    <LoginForm handleSubmit={onSubmit}/>
                </div>
            </div>
        </section>
    </div>
);

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, {})(Login);
