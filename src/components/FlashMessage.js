// @flow

import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


const FlashMessage = (props: { message: string }) => (
    <div className="notification is-danger">
        <FontAwesomeIcon icon="exclamation-circle" size="lg"/>&nbsp;{props.message}
    </div>
);

export default FlashMessage;
