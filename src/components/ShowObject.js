import React from 'react';

export const ShowObject = (props: {message: string, obj: any}) => (
    <div>
        {props.message && <p>{props.message}</p>}
        <pre>
            {JSON.stringify(props.obj, null, 4)}
        </pre>
    </div>
);
