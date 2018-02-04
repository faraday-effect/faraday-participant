// @flow

import React from 'react';

import LoginForm from '../forms/LoginForm';
import {authenticateUser} from "../reducers/user";
import FlashMessage from "../components/FlashMessage";

const handleLogin = (values, dispatch, props) => {
    console.log("VALUES", values);
    console.log("DISPATCH", dispatch);
    console.log("PROPS", props);

    const {email, password} = values;
    console.log("EMAIL", email, "PASSWORD", password);

    dispatch(authenticateUser(email, password));
};

const Login = (props: any) => {
    console.log(props);
    return (
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
                        <LoginForm onSubmit={handleLogin}/>
                        <FlashMessage/>
                        <p>No account? <a>Sign up!</a></p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
