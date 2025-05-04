// TourGridRightMain.tsx

import React from 'react';
import TourGridRight from './TourGridRight';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const TourGridRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Upcoming Activities' titleTwo='Explore upcoming activities' />
            <TourGridRight />
        </>
    );
};

export default TourGridRightMain;
