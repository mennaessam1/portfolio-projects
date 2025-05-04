// TourGridRightMain.tsx

import React from 'react';
import TourGridRight from './TourGridRight';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';


const TourGridRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Saved Events' titleTwo='Explore saved iteneraries and activities' />
            
            <TourGridRight />
        </>
    );
};

export default TourGridRightMain;
