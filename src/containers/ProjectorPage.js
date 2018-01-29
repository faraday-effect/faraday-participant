// @flow

import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {segmentFactory} from "../components/Segment";
import {PROJECTOR_NEXT, PROJECTOR_PREV, projectorNext, projectorPrev} from "../reducers/projector";

const ProjectorNavBar = (props) => (
    <nav className="navbar">
        <div className="container">
            <div className="navbar-brand">
                <span className="navbar-item">Faraday</span>
                <span className="navbar-item">{props.sectionIdx} / {props.segmentIdx}</span>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    {!props.isFirstSegment &&
                    <a className="navbar-item"
                       onClick={ev => props.projectorPrev()}>Previous</a>}
                    {!props.isLastSegment &&
                    <a className="navbar-item"
                       onClick={ev => props.projectorNext()}>Next</a>}
                </div>
            </div>
        </div>
    </nav>
);

const ProjectorPage = (props) => (
    <section className="hero is-info is-fullheight is-bold">
        <div className="hero-head">
            {ProjectorNavBar(props)}
        </div>
        <div className="hero-body">
            <div className="container">
                <h1 className="title">SYS 394&mdash;Information Systems Design</h1>
                <h2 className="subtitle">Spring 2018</h2>
                <h2 className="subtitle">
                    {moment().format('dddd, MMMM Do, YYYY')}
                </h2>
                <div>
                    {segmentFactory(props.currentSegment)}
                </div>
            </div>
        </div>
        <div className="hero-foot">
        </div>
    </section>
);

//const mapStateToProps = ({ projector }) => ({ projector });
const mapStateToProps = (state) => {
    return state.projector;
};

export default connect(mapStateToProps, {projectorPrev, projectorNext})(ProjectorPage);
