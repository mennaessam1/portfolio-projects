import React from 'react';
import CtaTourListing from '../common/CtaTourListing';
import TourListingAreaFour from './TourListingAreaFour';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourListingFourMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Listing Full width' titleTwo='Tour Listing Four'/>
            <TourListingAreaFour />
            <CtaTourListing />
        </>
    );
};

export default TourListingFourMain;