import React from 'react';
import TourListingArea from './TourListingArea';
import CtaTourListing from '../common/CtaTourListing';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourListingMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Listing Search' titleTwo='Tour Listing'/>
            <TourListingArea />
            <CtaTourListing />
        </>
    );
};

export default TourListingMain;