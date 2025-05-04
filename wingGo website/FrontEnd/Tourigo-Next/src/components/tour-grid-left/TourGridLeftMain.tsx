import React from 'react';
import TourGridLeft from './TourGridLeft';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourGridLeftMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Tour Grid' titleTwo='Tour Grid' />
            <TourGridLeft />
        </>
    );
};

export default TourGridLeftMain;