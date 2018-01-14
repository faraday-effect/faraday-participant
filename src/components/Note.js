import React from 'react';
import PropTypes from 'prop-types';
import './zenburn.css';

const Notes = props => {
    return (
        <div id={props.note.key}>
            <h2>{props.note.key}</h2>
            <div dangerouslySetInnerHTML={{__html: props.note.content}}/>
        </div>
    );
};
Notes.propTypes = {
    note: PropTypes.object.isRequired
};

export default Notes;
