import React from 'react';
import PropTypes from 'prop-types';
import './zenburn.css';

const md = require('markdown-it')()
    .use(require('markdown-it-highlightjs'));

const Notes = props => {
    console.log(props);
    return (
        <div id={props.note.key}>
            <h2>{props.note.key}</h2>
            <div dangerouslySetInnerHTML={{__html: md.render(props.note.content.join("\n"))}}/>
        </div>
    );
};
Notes.propTypes = {
    note: PropTypes.object.isRequired
};

export default Notes;
