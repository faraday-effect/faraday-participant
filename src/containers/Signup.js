// @flow

import React from 'react';

type InputProps = {
    label: string,
    placeholder: string
};

const TextInput = (props: InputProps) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <div className="control">
            <input className="input" type="text" placeholder={props.placeholder}/>
        </div>
    </div>
);

const EmailInput = (props: InputProps) => (
    <div className="field">
        <label className="label">{props.label}</label>
        <div className="control has-icons-left">
            <input className="input" type="email" placeholder={props.placeholder}/>
            <span className="icon is-left">
                <i className="fas fa-envelope"></i>
            </span>
        </div>
    </div>
);

const Button = (props: { label?: string }) => (
    <div className="field">
        <div className="control">
            <button className="button is-link" type="button">
                {props.label || 'Submit'}
            </button>
        </div>
    </div>
);

const Signup = () => {
    return (
        <div className="content">
            <div className="columns">
                <div className="column"></div>
                <div className="column is-three-fifths">
                    <h2 className="title is-2">Sign Up</h2>

                    <form>
                        <TextInput label="First Name" placeholder="Your name"/>
                        <TextInput label="Last Name" placeholder="More name"/>
                        <EmailInput label="Email Address" placeholder="who@example.com"/>
                        <Button/>
                    </form>
                </div>
                <div className="column"></div>
            </div>
        </div>
    );
};

export default Signup;
