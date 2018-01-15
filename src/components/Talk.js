// @flow
import * as React from 'react';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';
import './zenburn.css';
import {connect} from "react-redux";
import {fetchTalks, fetchTalkViews} from "../actions";
import * as _ from 'lodash';
import invariant from 'invariant';

const options = [
    { key: 1, text: 'Podium', value: 'podium' },
    { key: 2, text: 'Projector', value: 'projector' },
    { key: 3, text: 'Participant', value: 'participant' },
    { key: 4, text: 'Publication', value: 'publication' },
]

type SemanticUIData = {
    name: string,
    value: string
};

type OnChangeEventType = (SyntheticEvent<>, SemanticUIData) => void;

type OutputDropdownProps = {
    initialValue: string,
    handleChange: OnChangeEventType
};

const OutputDropdown = (props: OutputDropdownProps) => (
    <Dropdown
        selection
        options={options}
        defaultValue={props.initialValue}
        placeholder='Choose output type'
        onChange={props.handleChange}
    />
);

type TalkSegmentType = {
    key: string,
    type: Array<string>,
    content: string;
};

export type TalkType = {
    title: string,
    topic: string,
    segments: Array<TalkSegmentType>;
};

type TalkComponentProps = {
    talk: TalkType,
    fetchTalks: (destination? :string, allSegments? :boolean) => void
}

class Talk extends React.Component<TalkComponentProps> {
    handleOutputChange = (event: SyntheticEvent<>, data: SemanticUIData) => {
        this.props.fetchTalks(data.value);
    };

    render() {
        return (
            <Segment>
                <OutputDropdown
                    initialValue="podium"
                    handleChange={this.handleOutputChange}
                />
                <h1>{this.props.talk.title}</h1>
                <h2>{this.props.talk.topic}</h2>
                {this.props.talk.segments.map(segment =>
                    <div key={segment.key} id={segment.key}>
                        <h2>{segment.key}</h2>
                        <div dangerouslySetInnerHTML={{__html: segment.content}}/>
                    </div>
                )}
            </Segment>
        );
    }
}

type TalkViewsComponentProps = {
    talkViews: { [string]: TalkType },
    fetchTalks: (destination?: string, allSegments?: boolean) => void
}

class TalkViews extends React.Component<TalkViewsComponentProps> {
    handleOutputChange = (event: SyntheticEvent<>, data: SemanticUIData) => {
        this.props.fetchTalks(data.value, true);
    };

    renderColumn = (idx: number, columnKey: string) => {
        const segment = this.props.talkViews[columnKey].segments[idx];
        return (
            <Grid.Column width={7}>
                <Segment>
                    <p>{segment.key}</p>
                    <div dangerouslySetInnerHTML={{__html: segment.content}}/>
                </Segment>
            </Grid.Column>
        );
    };

    countSegments = () => {
        const segmentCounts =
            _.map(this.props.talkViews, (talk: TalkType, key: string) => talk.segments.length);
        invariant(_.every(segmentCounts, (value, idx, arr) => value === arr[0]),
            `Talks have differing numbers of segments: ${segmentCounts}`);
        return segmentCounts[0];
    };

    renderHeaders = () => (
        <Grid.Row key='header'>
            {_.map(['Left', 'Right'], value =>
                <Grid.Column width={7}>
                    <Segment>
                        <h2>{value}</h2>
                    </Segment>
                </Grid.Column>
            )}
        </Grid.Row>
    );

    renderRows = () =>
        _.map(_.range(this.countSegments()), idx => (
            <Grid.Row key={`row-${idx}`}>
                {this.renderColumn(idx, 'left')}
                {this.renderColumn(idx, 'right')}
            </Grid.Row>
        ));

    render() {
        return (
            <Grid columns='equal' centered={true}>
                {this.renderHeaders()}
                {this.renderRows()}
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    talkViews: state.talkViews
})

export default connect(mapStateToProps, {fetchTalkViews})(TalkViews);
