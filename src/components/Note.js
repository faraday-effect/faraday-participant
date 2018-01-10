import React from 'react';
import PropTypes from 'prop-types';
import './zenburn.css';

const md = require('markdown-it')()
    .use(require('markdown-it-highlightjs'));

const Notes = props => {
    return (
        <div>
            <h2>{props.key}</h2>
            <div dangerouslySetInnerHTML={{__html: md.render(props.content)}}/>
        </div>
    );
};
Notes.propTypes = {
    key: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default Notes;
