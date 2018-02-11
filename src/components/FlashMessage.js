// @flow

import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {connect} from "react-redux";
import type {State, FlashSeverity} from '../reducers/flash';
import {flashClear} from "../reducers/flash";

function flashConfig(severity: FlashSeverity) {
    switch(severity) {
        case 'info':
            return ['info-circle', 'is-info'];
        case 'warning':
            return ['minus-circle', 'is-warning'];
        case 'error':
            return ['exclamation-circle', 'is-danger'];
        default:
            throw new Error(`Invalid severity: '${severity}'`);
    }
}

type Props = State & {
    flashClear: Function
};

function FlashMessage(props: Props) {
    if (!props.visible) {
        return null;
    }

    const [flashIcon, flashStyle] = flashConfig(props.severity);
    return (
        <section className="section">
            <div className="container">
                <div className={`notification ${flashStyle}`}>
                    <button class="delete" onClick={props.flashClear()}></button>
                    <FontAwesomeIcon icon={flashIcon} size="lg"/>&nbsp;{props.message}
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => state.flash;
export default connect(mapStateToProps, {flashClear})(FlashMessage);
