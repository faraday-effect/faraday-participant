// @flow

import * as React from 'react';
import type {FieldProps} from 'redux-form';

type InputFieldProps = FieldProps & {
    label: string,
    placeholder: string,
    type: string
};

export const InputField = (props: InputFieldProps) => {
    const {label, placeholder, type, meta: {touched, invalid, error}} = props;
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <input className={touched && invalid ? "input is-danger" : "input"}
                       type={type}
                       placeholder={{placeholder} || 'Enter a value'}/>
            </div>
            {touched && invalid && <p className="help is-danger">{error}</p>}
        </div>
    )
};

type ButtonProps = {
    label?: string,
    disabled: boolean,
    onClick: any
}

export const Button = (props: ButtonProps) => (
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
