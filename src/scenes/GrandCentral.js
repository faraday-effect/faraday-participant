// @flow

import React from 'react';
import {connect} from "react-redux";

const GrandCentral = (props) => {
    const scope = props.user.scope;
    return (
        <section className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">Grand Central</h1>
                    <h3 className="subtitle is-3">Choose a Scene</h3>
                    <ul>
                        {scope.includes('use-projector') && <li><a>Projector</a></li>}
                        {scope.includes('use-podium') && <li><a>Podium</a></li>}
                        {scope.includes('participate') && <li><a>Participate</a></li>}
                    </ul>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(GrandCentral);
