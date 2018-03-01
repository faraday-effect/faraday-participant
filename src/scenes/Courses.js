// @flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import map from 'lodash/map';

import {NavBar} from "./components/NavBar";
import {Footer} from "./components/Footer";

import {getCurrentCourses} from "../reducers/courses";
import {flashInfo} from "../reducers/flash";

import type {State as CoursesState} from '../reducers/courses';
import type {State as SemestersState} from '../reducers/semester';
import type {State as OfferingsState} from '../reducers/offerings';

type Props = {
    getCurrentCourses: Function,
    courses: CoursesState,
    semester: SemestersState,
    offerings: OfferingsState,
    flashInfo: Function
};

class Courses extends Component<Props> {
    componentDidMount() {
        this.props.getCurrentCourses();
    }

    render() {
        if (this.props.loading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <NavBar/>

                <section className="section">
                    <div className="container">
                        <h1 className="title is-1">Courses</h1>
                        <ul>
                            {map(this.props.courses, course =>
                                <li key={course._id}>{course.designation}&mdash;{course.title}</li>)}
                        </ul>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h1 className="title is-1">Current Semester</h1>
                        <p>{this.props.semester._id} {this.props.semester.name} {this.props.semester.year}</p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <h1 className="title is-1">Offerings</h1>
                        <ul>
                            {map(this.props.offerings, offering =>
                                <li key={offering._id}>{offering.courseId} of {offering.semesterId}</li>)}
                        </ul>
                    </div>
                </section>

                <Footer/>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    courses: state.courses,
    semester: state.semester,
    offerings: state.offerings,
    loading: state.loading
});
export default connect(mapStateToProps, {flashInfo, getCurrentCourses})(Courses);
