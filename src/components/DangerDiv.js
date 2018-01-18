import React from 'react';

const DangerDiv = (props: { content: string}) => (
    <div dangerouslySetInnerHTML={{__html: props.content}}/>
);

export default DangerDiv;
