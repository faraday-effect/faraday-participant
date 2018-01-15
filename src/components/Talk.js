// @flow
import * as React from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';
import './zenburn.css';
import {connect} from "react-redux";
import {fetchTalks} from "../actions";

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
    fetchTalks: (string) => void
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

export default connect(null, {fetchTalks})(Talk);
