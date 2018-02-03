// @flow

import * as React from 'react';

import {Field, reduxForm} from 'redux-form';
import {Button, InputField} from "./components";

import Validator from 'validatorjs';

const LogInForm = () => (
    <form onSubmit={data => console.log("FORM", data)}>
        <Field name="email" type="text" label="Email Address" placeholder="you@example.com" component={InputField}/>
        <Field name="password" type="password" label="Password" placholder="secret" component={InputField}/>
        <Button disabled={true} onClick={ev => console.log(ev)}/>
    </form>
);

function logInValidator(data) {
    const rules = {
        email: 'required|email',
        password: 'required'
    };

    const validator = new Validator(data, rules);
    validator.passes();
    return validator.errors.all();
}

export default reduxForm({
    form: 'signup',
    validate: logInValidator
})(LogInForm);
