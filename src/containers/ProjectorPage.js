// @flow

import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {segmentFactory} from "../components/Segment";
import {projectorFirst, projectorLast, projectorNext, projectorPrev} from "../reducers/projector";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// Navigation button, including "disabled" status. Note that we have to
// mark the button disabled so it renders properly, AND short circuit
// the action when disabled.
const NavButton = (props) => (
    <div className="navbar-item">
        <a className="button"
           disabled={props.disabled}
           onClick={ev => props.disabled || props.action()}>
            <span className="icon">
                <FontAwesomeIcon icon={props.icon}/>
            </span>
            <span>{props.label}</span>
        </a>
    </div>
);

const ProjectorNavBar = (props) => (
    <nav className="navbar">
        <div className="container">
            <div className="navbar-brand">
                <span className="navbar-item">Faraday</span>
                <span className="navbar-item">{props.sectionIdx} / {props.segmentIdx}</span>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <NavButton label="First" icon="angle-double-left"
                               disabled={props.isFirstSegment} action={props.projectorFirst}/>
                    <NavButton label="Previous" icon="angle-left"
                               disabled={props.isFirstSegment} action={props.projectorPrev}/>
                    <NavButton label="Next" icon="angle-right"
                               disabled={props.isLastSegment} action={props.projectorNext}/>
                    <NavButton label="Last" icon="angle-double-right"
                               disabled={props.isLastSegment} action={props.projectorLast}/>
                </div>
            </div>
        </div>
    </nav>
);

const SplashScreen = () => (
    <section className="hero is-info is-fullheight is-bold">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">SYS 394&mdash;Information Systems Design</h1>
                <h2 className="subtitle">Spring 2018</h2>
                <h2 className="subtitle">
                    {moment().format('dddd, MMMM Do, YYYY')}
                </h2>
            </div>
        </div>
    </section>
);

const ContentScreen = (props) => (
    <section className="hero is-fullheight">
        <div className="hero-body">
            <div className="container">
                {segmentFactory(props.currentSegment)}
            </div>
        </div>
        <div className="hero-foot">
            {ProjectorNavBar(props)}
        </div>
    </section>
);

const ProjectorPage = (props) => {
    console.log(JSON.stringify(props, null, 4));
    const showSplash: boolean = false;
    return showSplash? SplashScreen() : ContentScreen(props);
};

const mapStateToProps = (state) => state.projector;

export default connect(mapStateToProps, {projectorPrev, projectorNext, projectorFirst, projectorLast})(ProjectorPage);
