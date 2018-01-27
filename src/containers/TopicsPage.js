// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Link from 'redux-first-router-link';

import {fetchAll, selectTopic, selectSection, selectSegment} from "../reducers/topics";

import FlashMessage from '../components/FlashMessage';
import type {State} from "../reducers/topics";
import type {Action} from "../types/redux";
import {segmentFactory} from "../components/Segment";
import {TOPICS} from '../routesMap';

// import Quiz from '../components/quiz/Quiz';

type Props = State & {
    fetchAll: () => Action,
    selectTopic: (string) => Action,
    selectSection: (string) => Action,
    selectSegment: (string) => Action
};

/*
               | Offering        |                     |
               |   Theme         |                     |
   Topic       |     Topic       |                     |
     Cell      |       Section   | Listing             | Quiz
       Segment |         Segment |   Code/Note/CueCard |   Question
 */

const DrillButton = (props: {onClick: void => any, type?: string, children: Array<any>}) => (
    <span>
        <button className="button small" onClick={props.onClick}>
            {props.children}
        </button>
        {props.type && <span className="tag is-info is-pulled-right">{props.type}</span>}
    </span>
);

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
                                        <Link onClick={ev => this.props.selectTopic(topic)}
                                              to={{ type: TOPICS, payload: { topicId: topic._id }}}>
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
                                        <DrillButton type={section.type}
                                                     onClick={ev => this.props.selectSection(section)}>
                                            {section._id}
                                        </DrillButton>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="column">
                            <h4 className="title is-4">Segments</h4>
                            <ul>
                                {_.map(this.props.selectedSegments, (segment, idx) =>
                                    <li key={idx}>
                                        <DrillButton type={segment.type}
                                                     onClick={ev => this.props.selectSegment(segment)}>
                                            {segment._id}
                                        </DrillButton>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            {this.props.selectedSegment && segmentFactory(this.props.selectedSegment)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => state.topics;

export default connect(mapStateToProps, {fetchAll, selectTopic, selectSection, selectSegment})(TopicsPage);
