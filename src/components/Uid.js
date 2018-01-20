import React from 'react';

const Uid = (props: { _id: string }) => (
    <span className="tag">{props._id}</span>
);

export default Uid;
