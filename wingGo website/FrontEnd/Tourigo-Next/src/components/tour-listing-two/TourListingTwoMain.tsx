import React from 'react';
import TourListingAreaTwo from './TourListingAreaTwo';
import CtaTourListing from '../common/CtaTourListing';
import BannerListingArea from './BannerListingArea';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourListingTwoMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Listing Two' titleTwo='Tour Listing Two'/>
            <BannerListingArea />
            <TourListingAreaTwo />
            <CtaTourListing />
        </>
    );
};

export default TourListingTwoMain;