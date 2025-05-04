// TourGridRightMain.tsx

import React from 'react';
import TourGridRight from './TourGridRight';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';


const TourGridRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Places' titleTwo='Explore Places' />
            
            <TourGridRight />
        </>
    );
};

export default TourGridRightMain;
