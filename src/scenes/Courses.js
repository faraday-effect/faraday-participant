// @flow

import React, {Component} from 'react';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {getCourses} from "../reducers/courses";
import {connect} from "react-redux";
import type {State as CoursesState} from '../reducers/courses';

type Props = {
    courses: CoursesState,
    getCourses: Function
};

class Courses extends Component<Props> {

    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        return (
            <div>
                <Header/>
                <h1 className="title is-1">Courses</h1>
                <ul>
                    {this.props.courses.map(course => <li>{course._id}{course.title}</li>)}
                </ul>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({courses: state.courses});
export default connect(mapStateToProps, {getCourses})(Courses);
