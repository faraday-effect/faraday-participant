// @flow

import React from 'react';

import {Field, reduxForm} from 'redux-form';
import {Button, InputField} from "./components";

import Validator from 'validatorjs';

const LoginForm = (props) => {
    const {invalid, handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field name="email" type="text" label="Email Address" placeholder="you@example.com"
                   component={InputField}/>
            <Field name="password" type="password" label="Password" placholder="secret"
                   component={InputField}/>
            <Button disabled={invalid} onClick={handleSubmit}/>
        </form>
    );
}

function loginValidator(data) {
    const rules = {
        email: 'required|email',
        password: 'required|min:8'
    };

    const validator = new Validator(data, rules);
    validator.passes();
    return validator.errors.all();
}

export default reduxForm({
    form: 'login',
    validate: loginValidator
})(LoginForm);
