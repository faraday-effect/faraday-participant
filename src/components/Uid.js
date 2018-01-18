import React from 'react';
import { Label } from 'semantic-ui-react';

const Uid = (props: { uid: string }) => (
    <Label tag color="teal">{props.uid}</Label>
);

export default Uid;
