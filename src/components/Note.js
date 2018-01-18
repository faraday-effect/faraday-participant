// @flow

import React from 'react';

import DangerDiv from './DangerDiv';

export type NoteType = {
    type: "note",
    content: string,
};

export const Note = (props: {note: NoteType}) => (
    <div>
        <DangerDiv content={props.note.content}/>
    </div>
);

export default Note;
