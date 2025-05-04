import React from 'react';
import TourDetailsLeft from './TourDetailsLeft';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourDetailsLeftMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Details Left' titleTwo='Tour Details Left' />
            <TourDetailsLeft />
        </>
    );
};

export default TourDetailsLeftMain;