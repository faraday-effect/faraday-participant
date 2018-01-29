// @flow

import React from 'react';
import {Uid} from './util';

import type {SegmentType} from "./Segment";
import {segmentFactory} from "./Segment";

export type ListingType = {
    type: "listing",
    _id: string,
    segments: Array<SegmentType>
};

export const Listing = (props: {listing: ListingType}) => (
    <div>
        <Uid type="Listing" _id={props.listing._id}/>
        {props.listing.segments.map((segment, idx) => segmentFactory(segment))}
    </div>
);

export default Listing;
