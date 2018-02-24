// @flow

import React, {Component} from 'react';
import {connect} from "react-redux";
import map from 'lodash/map';
import {find} from "lodash/collection";
import moment from 'moment';

import {NavBar} from "./components/NavBar";
import {Footer} from "./components/Footer";

import {getCourses} from "../reducers/courses";
import {flashInfo} from "../reducers/flash";

import type {State as CoursesState} from '../reducers/courses';
import type {State as SemestersState} from '../reducers/semesters';
import type {State as OfferingsState} from '../reducers/offerings';

type Props = {
    getCourses: Function,
    courses: CoursesState,
    semesters: SemestersState,
    offerings: OfferingsState,
    flashInfo: Function
};

class Courses extends Component<Props> {
    componentDidMount() {
        this.props.getCourses();
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
        if (this.props.loading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <NavBar/>

                {/*<ol>*/}
                    {/*{map(this.findCurrentOfferings(), offering => {*/}
                        {/*const course = this.props.courses[offering.courseId];*/}
                        {/*return <li>{course.designation}&mdash;{course.title}</li>;*/}
                    {/*})}*/}
                {/*</ol>*/}

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
    offerings: state.offerings,
    loading: state.loading
});
export default connect(mapStateToProps, {flashInfo, getCourses})(Courses);
