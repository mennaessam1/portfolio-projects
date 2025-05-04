import React from 'react';
import TourDetailsRight from './TourDetailsRight';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourDetailsRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Details Right' titleTwo='Tour Details Right' />
            <TourDetailsRight />
        </>
    );
};

export default TourDetailsRightMain;