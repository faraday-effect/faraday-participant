import React from 'react';

export const Uid = (props: { type: string, _id: string }) => (
    <div className="tags has-addons">
        <span className="tag is-info">{props.type}</span>
        <span className="tag">{props._id}</span>
    </div>
);
