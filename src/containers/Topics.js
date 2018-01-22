// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchAll} from "../reducers/topics";

import Topic from '../components/Topic';
import FlashMessage from '../components/FlashMessage';
import type {TopicType} from "../components/Topic";

type Props = {
    topicsById: { [string]: TopicType },
    isFetchActive: boolean,
    error: string,
    fetchAll: void => void
};

class Topics extends Component<Props> {
    componentDidMount() {
        this.props.fetchAll();
    }

    render () {
        return (
            <div>
                {this.props.error && <FlashMessage message={this.props.error}/>}
                {_.map(this.props.topicsById, topic => <Topic key={topic._id} topic={topic}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {byId, isFetchActive, error} = state.topics;
    return {
        topicsById: byId,
        isFetchActive,
        error
    };
};

export default connect(mapStateToProps, {fetchAll})(Topics);
