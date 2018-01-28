// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Link from 'redux-first-router-link';

import {fetchAll} from "../reducers/topics";

import FlashMessage from '../components/FlashMessage';
import type {State} from "../reducers/topics";
import type {Action} from "../types/redux";
import {segmentFactory} from "../components/Segment";
import {TOPICS_PAGE} from '../reducers/page';

// import Quiz from '../components/quiz/Quiz';

type Props = State & {
    fetchAll: () => Action
};

/*
               | Offering        |                     |
               |   Theme         |                     |
   Topic       |     Topic       |                     |
     Cell      |       Section   | Listing             | Quiz
       Segment |         Segment |   Code/Note/CueCard |   Question
 */

class TopicsPage extends Component<Props> {
    componentDidMount() {
        this.props.fetchAll();
    }

    render () {
        if (this.props.isFetchActive) {
            return <p>LOADING</p>;
        } else {
            return (
                <div>
                    {this.props.error && <FlashMessage message={this.props.error}/>}

                    <div className="columns">
                        <div className="column">
                            <h4 className="title is-4">Topics</h4>
                            <ul>
                                {_.map(this.props.allTopics, (topic, idx) =>
                                    <li key={idx}>
                                        <Link to={{type: TOPICS_PAGE, payload: { topicId: topic._id }}}>
                                            {topic.title}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="column">
                            <h4 className="title is-4">Sections</h4>
                            <ul>
                                {_.map(this.props.selectedSections, (section, idx) =>
                                    <li key={idx}>
                                        <Link to={{type: TOPICS_PAGE, payload: {
                                                topicId: this.props.currentTopic._id,
                                                sectionId: section._id
                                            }}}>
                                            {section._id}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="column">
                            <h4 className="title is-4">Segments</h4>
                            <ul>
                                {_.map(this.props.selectedSegments, (segment, idx) =>
                                    <li key={idx}>
                                        <Link to={{type: TOPICS_PAGE, payload: {
                                                topicId: this.props.currentTopic._id,
                                                sectionId: this.props.currentSection._id,
                                                segmentId: segment._id}}}>
                                            {segment._id}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            {this.props.currentSegment && segmentFactory(this.props.currentSegment)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => state.topics;

export default connect(mapStateToProps, {fetchAll})(TopicsPage);
