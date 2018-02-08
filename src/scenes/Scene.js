// @flow

import React from 'react';
import {componentMap} from './reducer';
import {connect} from "react-redux";

const Scene = (scene) => {
    const TheScene = componentMap[scene.name];
    return TheScene ? <TheScene /> : null
};

const mapStateToProps = state => state.scene;
export default connect(mapStateToProps, {})(Scene);
