// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Link from 'redux-first-router-link';

import FlashMessage from '../components/FlashMessage';
import {segmentFactory} from "../components/Segment";
import {TOPICS_PAGE} from '../reducers/page';

/*
               | Offering        |                     |
               |   Theme         |                     |
   Topic       |     Topic       |                     |
     Cell      |       Section   | Listing             | Quiz
       Segment |         Segment |   Code/Note/CueCard |   Question
 */

class TopicsPage extends Component<*> {
    render () {
        if (this.props.loading) {
            return <p>LOADING</p>;
        } else {
            return (
                <div>
                    {this.props.topics.error && <FlashMessage message={this.props.topics.error}/>}

                    <div className="columns">
                        <div className="column">
                            <h4 className="title is-4">Topics</h4>
                            <ul>
                                {_.map(this.props.topics.allTopics, (topic, idx) =>
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
                                {_.map(this.props.topics.selectedSections, (section, idx) =>
                                    <li key={idx}>
                                        <Link to={{type: TOPICS_PAGE, payload: {
                                                topicId: this.props.topics.currentTopic._id,
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
                                {_.map(this.props.topics.selectedSegments, (segment, idx) =>
                                    <li key={idx}>
                                        <Link to={{type: TOPICS_PAGE, payload: {
                                                topicId: this.props.topics.currentTopic._id,
                                                sectionId: this.props.topics.currentSection._id,
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
                            {this.props.topics.currentSegment && segmentFactory(this.props.topics.currentSegment)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ topics, loading }) => ({ topics, loading });

export default connect(mapStateToProps, {})(TopicsPage);
