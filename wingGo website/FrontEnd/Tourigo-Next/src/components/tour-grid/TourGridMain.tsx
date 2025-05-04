import React from 'react';
import TourGrid from './TourGrid';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourGridMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Grid' titleTwo='Tour Grid' />
            <TourGrid />
        </>
    );
};

export default TourGridMain;