// @flow

import * as React from 'react';

import { Field, reduxForm } from 'redux-form'
import type { FieldProps } from 'redux-form';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Validator from 'validatorjs';

function haveError(props) {
    return props.meta.touched && props.meta.invalid;
}

function commonAttributes(props) {
    const attr = {
        className: "input",
        placeholder: props.placeholder || 'Enter a value'
    };
    if (haveError(props)) {
        attr.className += " is-danger";
    }
    return attr;
}

const errorMessage = (props) =>
    haveError(props) ? <p className="help is-danger">{props.meta.error}</p> : "";

type InputProps = FieldProps & {
    label: string,
    placeholder: string
};

const renderTextInput = (props: InputProps) : React.Node => {
    const common = commonAttributes(props);
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input {...props.input}{...common} type="text"/>
            </div>
            {errorMessage(props)}
        </div>
    );
};

const renderEmailInput = (props: InputProps) : React.Node => {
    const common = commonAttributes(props);
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control has-icons-left">
                <input {...props.input}{...common} type="email"/>
                <span className="icon is-left">
                    <FontAwesomeIcon icon="envelope"/>
                </span>
            </div>
            {haveError(props) && <p className="help is-danger">{props.meta.error}</p>}
        </div>
    );
};

type ButtonProps = {
    label?: string,
    disabled: boolean,
    onClick: any
}

const Button = (props: ButtonProps) => (
    <div className="field">
        <div className="control">
            <button className="button is-link"
                    type="button"
                    disabled={props.disabled}
                    onClick={props.onClick}>
                {props.label || 'Submit'}
            </button>
        </div>
    </div>
);

// FIXME: declaration
const SignupForm = (props: any) => {
    return (
        <form onSubmit={data => console.log("FORM", data)}>
            <Field name="email" component={renderEmailInput}
                   label="Email Address" placeholder="who@example.com"/>
            <Field name="firstName" component={renderTextInput}
                   label="First Name" placeholder="Your given name"/>
            <Field name="lastName" component={renderTextInput}
                   label="Last Name" placeholder="Your surname"/>
            <Button disabled={props.invalid}
                    onClick={props.handleSubmit}/>
        </form>
    );
};

function signupValidator(data) {
    const rules = {
        email: 'required|email',
        firstName: 'required',
        lastName: 'required'
    };

    const validator = new Validator(data, rules);
    validator.passes();
    return validator.errors.all();
}

export default reduxForm({
    form: 'signup',
    validate: signupValidator
})(SignupForm);
