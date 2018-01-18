// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Header } from 'semantic-ui-react';

import DangerDiv from '../components/DangerDiv';
import Uid from '../components/Uid';
import Listing from './Listing';
import type {ListingType} from "./Listing";
// import Quiz from './Quiz';
import {fetchTopic} from '../reducers/topics';

export type TopicType = {
    _id: string,
    uid: string,
    title: string,
    intro: string,
    cells: Array<ListingType>
};

// type TopicProps = {
//     ...TopicType,
//     fetchTopic: any
// };

class Topic extends Component<any> {        // TODO: FIX TYPE
    componentDidMount() {
        this.props.fetchTopic('flask-templates');
    }

    render() {
        return (
            <div>
                <Header as="h1" textAlign="center">{this.props.topic.title}</Header>
                <Uid uid={this.props.topic.uid}/>
                <DangerDiv content={this.props.topic.intro}/>
                {this.props.topic.cells.map(cell => {
                    switch (cell.type) {
                        case 'listing':
                            return <Listing key={cell.uid} listing={cell}/>;
                        // case 'quiz':
                        //     return <Quiz key={cell.uid} quiz={cell}/>;
                        default:
                            return <p>{`Bogus cell type: ${cell.type}`}</p>;
                    }
                })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.topics;
}

export default connect (mapStateToProps, {fetchTopic})(Topic);
