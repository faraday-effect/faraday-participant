// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import _ from 'lodash';

import {fetchAll} from "../reducers/topics";

import FlashMessage from '../components/FlashMessage';
import type {CellType, TopicType} from "../components/Topic";
import type {SegmentType} from '../components/Listing';

import Code from '../components/Code';
import Note from '../components/Note';
import CueCard from '../components/CueCard';
import Quiz from '../components/quiz/Quiz';
import type {ContextRouter, Match} from "react-router-dom";
import {ShowObject} from "../components/util";

const Segments = (props) => (
    <div>
        <p>[[SEGMENT LIST</p>
        <ul>{
            _.map(props.segments, segment =>
                <li key={`${segment.type}-${segment._id}`}>
                    <Link to={`${props.match.url}/${segment.type}/${segment._id}`}>
                        {segment.type} {segment._id}
                    </Link>
                </li>
            )
        }</ul>
        <p>SEGMENT LIST]]</p>

        <p>[[BAZ</p>
        <Route path={`${props.match.path}/:segmentType/:segmentId`}
               render={routeProps => {
                   const segmentType = routeProps.match.params.segmentType || '[UNDEFINED]';
                   const segmentId = routeProps.match.params.segmentId || '[UNDEFINED]';
                   const segment = props.segments.find(seg => seg.type === segmentType && seg._id === segmentId);
                   let key = `${segmentType}-${segmentId}`;
                   switch(segmentType) {
                       case 'code':
                           return <Code key={key} code={segment}/>;
                       case 'cue-card':
                           return <CueCard key={key} cuecard={segment}/>;
                       case 'note':
                           return <Note key={key} note={segment}/>;
                       default:
                           throw new Error(`Invalid segment type '${segment.type}'`);
                   }
               }}
        />
        <p>BAZ]]</p>
    </div>
);

const Cells = (props: any) => {
    return (
        <div>
            <p>[[CELL LIST</p>
            <ul>{
                _.map(props.topic.cells, cell =>
                    <li key={cell._id}>
                        <Link to={`${props.match.url}/${cell.type}/${cell._id}`}>
                            {cell.type} {cell._id}
                        </Link>
                    </li>
                )
            }</ul>
            <p>CELL LIST]]</p>

            <p>[[BAR</p>
            <Route path={`${props.match.path}/:cellType/:cellId`}
                   render={routeProps => {
                       const cellType = routeProps.match.params.cellType;
                       const cellId = routeProps.match.params.cellId;
                       const cell = props.topic.cells.find(c => c._id === cellId);
                       switch (cellType) {
                           case 'listing':
                               return <Segments {...routeProps} segments={cell.segments}/>;
                           case 'quiz':
                               return <Quiz key={cell._id} quiz={cell} onSubmit={(val) => console.log(val)}/>;
                           default:
                               throw new Error(`Invalid cell type ${cellType || '[Unknown]'}`);
                       }
                   }}
            />
            <p>BAR]]</p>
        </div>
    );
};

type TopicsMap = {[string]: TopicType};

const getAllTopics = (props): TopicsMap => props.topicsById;

const getOneTopic = (props, match: Match): TopicType => getAllTopics(props)[match.params.topicId];

const getAllCells = (props, match: Match): Array<CellType> =>
    getOneTopic(props, match.params.topicId).cells;

const getOneCell = (props, match: Match) => {
    const cellType = match.params.cellType;
    const cellId = match.params.cell_id;
    return getAllCells(props, match.params.topicId)
        .find(cell => cell.type === cellType && cell._id === cell._id);
}

const getAllSegments = (props, match: Match): Array<SegmentType> => {
const cellType = match.params.cellType;
const cellId = match.params.cell_id;
return getOneCell(props, topicId, cellType, cellId).segments;

const getOneSegment = (props, topicId: string, cellType, cellId, segmentType, segmentId) =>
    getOneCell(props, topicId, cellType, cellId).find(seg => seg.type === segmentType && seg._id === segmentId);

const TopicList = (props) => (
    <div>
        <ul>{
            _.map(getAllTopics(props), topic => (
                <li key={topic._id}>
                    <Link to={`${props.match.url}/${topic._id}`}>
                        {topic._id}
                    </Link>
                </li>
            ))
        }</ul>
        <ShowObject obj={props.match}/>
    </div>
);

const CellList = (props) => {
    const topicId = props.match.params.topicId || '[UNDEFINED]';
    return (
        <div>
            <ul>{
                _.map(getAllCells(props, topicId), cell =>
                    <li key={cell._id}>
                        <Link to={`${props.match.url}/${cell.type}/${cell._id}`}>
                            {cell.type} {cell._id}
                        </Link>
                    </li>
                )
            }</ul>
            <ShowObject obj={props.match}/>
        </div>
    );
}

const SegmentList = (props) => {
    const topicId = props.match.params.topicId;
    const cellType = props.match.params.cellId;
    const cellId = props.match.params.cellId;
    return (
        <div>
            <ul>{
                _.map(getAllSegments(props, topicId, segmentType, cellId), segment =>
                    <li key={`${segment.type}-${segment._id}`}>
                        <Link to={`${props.match.url}/${segment.type}/${segment._id}`}>
                            {segment.type} {segment._id}
                        </Link>
                    </li>
                )
            }</ul>
            <ShowObject obj={props.match}/>
        </div>
    );
}

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
                            <h3 className="title is-3">Topics</h3>
                            <Route path="/topics"
                                   render={props => <TopicList {...props} topicsById={this.props.topicsById}/>}/>
                        </div>
                        <div className="column">
                            <h3 className="title is-3">Cells</h3>
                            <Route path="/topics/:topicId"
                                   render={props => <CellList {...props} topicsById={this.props.topicsById}/>}/>
                        </div>
                        <div className="column">
                            <h3 className="title is-3">Segments</h3>
                            <Route path="/topics/:topicId/:segmentType/:segmentId"
                                   render={props => <SegmentList {...props} topicsById={this.props.topicsById}/>}/>
                        </div>
                    </div>

                    {/*<Route path={`${this.props.match.path}/:topicId`}*/}
                    {/*render={(routeProps: ContextRouter) => {*/}
                    {/*console.log(routeProps);*/}
                    {/*const topicId = routeProps.match.params['topicId'];*/}
                    {/*if (topicId !== null) {*/}
                    {/*const topic = this.props.topicsById[topicId || 'Unknown'];*/}
                    {/*return <Cells {...routeProps} topic={topic}/>*/}
                    {/*} else {*/}
                    {/*return <p>ERROR</p>;*/}
                    {/*}*/}
                    {/*}}*/}
                    {/*/>*/}
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
