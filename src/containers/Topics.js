// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchAll} from "../reducers/topics";

import FlashMessage from '../components/FlashMessage';
import type {TopicType} from "../components/Topic";

import Code from '../components/Code';
import Note from '../components/Note';
import CueCard from '../components/CueCard';
import Quiz from '../components/quiz/Quiz';
import type {ContextRouter} from "react-router-dom";

type Props = ContextRouter & {
    topicsById: { [string]: TopicType },
    isFetchActive: boolean,
    error: string,
    fetchAll: void => void,
};

class Topics extends Component<Props> {
    componentDidMount() {
        this.props.fetchAll();
    }

    render () {
        if (_.size(this.props.topicsById) === 0) {
            return <p>LOADING</p>;
        } else {
            return (
                <div>
                    {this.props.error && <FlashMessage message={this.props.error}/>}

                    <div className="columns">
                        <div className="column">
                            TOPICS
                        </div>
                        <div className="column">
                            CELLS
                        </div>
                        <div className="column">
                            SEGMENTS
                        </div>
                    </div>
                </div>
            );
        }
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
