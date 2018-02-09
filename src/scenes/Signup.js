// @flow

import React from 'react';

import SignupForm from '../forms/SignupForm';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

class SignupPage extends React.Component<*> {
    submit = (values: any) => {                 // FIXME
        console.log("SIGNED UP WITH", values);
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="content">
                    <div className="columns">
                        <div className="column"/>
                        <div className="column is-three-fifths">
                            <h2 className="title is-2">Sign Up</h2>
                            <SignupForm onSubmit={this.submit}/>
                        </div>
                        <div className="column"/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default SignupPage;
