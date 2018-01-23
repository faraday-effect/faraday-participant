// @flow

import React from 'react';

import DangerDiv from './DangerDiv';
import {Uid} from './util';

export type NoteType = {
    type: "note",
    _id: string,
    content: string,
};

export const Note = (props: {note: NoteType}) => (
    <div>
        <Uid type="Note" _id={props.note._id}/>
        <DangerDiv content={props.note.content}/>
    </div>
);

export default Note;
