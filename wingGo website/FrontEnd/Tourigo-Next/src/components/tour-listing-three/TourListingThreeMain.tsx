import React from 'react';
import CtaTourListing from '../common/CtaTourListing';
import TourListingAreaThree from './TourListingAreaThree';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourListingThreeMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Listing Three' titleTwo='Tour Listing Three'/>
            <TourListingAreaThree />
            <CtaTourListing />
        </>
    );
};

export default TourListingThreeMain;