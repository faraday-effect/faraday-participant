// @flow

import React from 'react';
import faradaySignature from '../../assets/faraday-sig-small.png';

export const Footer = () => (
    <section className="section">
        <footer className="footer">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <h4 className="title is-4">Faraday</h4>
                    </div>
                    <div className="column">
                        Actionable Educational Intelligence
                    </div>
                    <div className="column">
                        <img className="is-pulled-right" src={faradaySignature} alt="Faraday's signature"/>
                    </div>
                </div>
            </div>
        </footer>
    </section>
);