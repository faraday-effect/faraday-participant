import React from 'react';
import PropTypes from 'prop-types';
import './zenburn.css';

const Talk = props => {
    return (
        <div id={props.talk.key}>
            <h2>{props.talk.key}</h2>
            <div dangerouslySetInnerHTML={{__html: props.talk.content}}/>
        </div>
    );
};
Talk.propTypes = {
    talk: PropTypes.object.isRequired
};

export default Talk;
