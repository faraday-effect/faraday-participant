// @flow

import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {connect} from "react-redux";
import type {State, FlashSeverity} from '../reducers/flash';

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

function FlashMessage(props: State) {
    if (!props.visible) {
        return null;
    }

    const [flashIcon, flashStyle] = flashConfig(props.severity);
    return (
        <div className={`notification ${flashStyle}`}>
            <FontAwesomeIcon icon={flashIcon} size="lg"/>&nbsp;{props.message}
        </div>
    );
}

const mapStateToProps = state => state.flash;
export default connect(mapStateToProps, {})(FlashMessage);
