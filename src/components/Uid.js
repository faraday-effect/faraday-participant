import React from 'react';

const Uid = (props: { type: string, _id: string }) => (
    <div class="tags has-addons">
        <span className="tag is-info">{props.type}</span>
        <span className="tag">{props._id}</span>
    </div>
);

export default Uid;
