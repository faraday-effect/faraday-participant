import React from 'react';

export const Uid = (props: { type: string, _id: string }) => (
    <div className="tags has-addons">
        <span className="tag is-info">{props.type}</span>
        <span className="tag">{props._id}</span>
    </div>
);

export const ShowObject = (props: {message: string, obj: any}) => (
    <div>
        <p>{props.message}</p>
        <pre>
            {JSON.stringify(props.obj, null, 4)}
        </pre>
    </div>
);
