// @flow

import React from 'react';

import SignupForm from '../forms/SignUpForm';

class SignupPage extends React.Component<*> {
    submit = (values: any) => {                 // FIXME
        console.log("SIGNED UP WITH", values);
    };

    render() {
        return (
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
        );
    }
}

export default SignupPage;
