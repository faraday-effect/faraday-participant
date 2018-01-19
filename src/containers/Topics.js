// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchAll} from "../reducers/topics";

import Topic from '../components/Topic';
import type {TopicType} from "../components/Topic";

type Props = {
    topics: Array<TopicType>,
    fetchAll: () => Array<TopicType>
}

class Topics extends Component<Props> {
    componentDidMount() {
        this.props.fetchAll();
    }

    render () {
        return (
            <div>
                {_.map(this.props.topics, topic => <Topic key={topic._id} topic={topic}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    topics: state.topics
});

export default connect(mapStateToProps, {fetchAll})(Topics);
