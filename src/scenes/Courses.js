// @flow

import React, {Component} from 'react';
import {Footer} from "./components/Footer";
import {getCourses} from "../reducers/courses";
import {connect} from "react-redux";
import type {State as CoursesState} from '../reducers/courses';
import {NavBar} from "./components/NavBar";
import {getSemesters} from "../reducers/semesters";
import type {State as SemestersState} from '../reducers/semesters';
import type {State as OfferingsState} from '../reducers/offerings';
import {getOfferings} from "../reducers/offerings";
import map from 'lodash/map';
import moment from 'moment';
import {find} from "lodash/collection";
import {flashInfo} from "../reducers/flash";

type Props = {
    courses: CoursesState,
    getCourses: Function,
    semesters: SemestersState,
    getSemesters: Function,
    offerings: OfferingsState,
    getOfferings: Function,
    flashInfo: Function
};

class Courses extends Component<Props> {
    componentDidMount() {
        this.props.getCourses();
        this.props.getSemesters();
        this.props.getOfferings();
    }

    findCurrentSemester() {
        const now = moment();
        return find(this.props.semesters, semester =>
            now.isBetween(semester.courseDates.instruction.start, semester.courseDates.finals.end));
    }

    findCurrentOfferings() {
        const currentSemester = this.findCurrentSemester();
        return find(this.props.offerings, offering => offering.semesterId === currentSemester._id);
    }

    render() {
        this.findCurrentSemester();
        return (
            <div>
                <NavBar/>

                <ol>
                {map(this.findCurrentOfferings(), offering => {
                    const course = this.props.courses[offering.courseId];
                    return <li>{course.designation}&mdash;{course.title}</li>;
                })}
                </ol>

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
                        <h1 className="title is-1">Semesters</h1>
                        <ul>
                            {map(this.props.semesters, semester =>
                                <li key={semester._id}>{semester.name} {semester.year}</li>)}
                        </ul>
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
    semesters: state.semesters,
    offerings: state.offerings
});
export default connect(mapStateToProps, {flashInfo, getCourses, getSemesters, getOfferings})(Courses);
