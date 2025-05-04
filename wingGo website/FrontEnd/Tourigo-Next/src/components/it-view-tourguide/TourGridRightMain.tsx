// TourGridRightMain.tsx

import React from 'react';
import TourGridRight from './TourGridRightTourGuide';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';


const TourGridRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Itineraries' titleTwo='Your Itineraries' />
            
            <TourGridRight />
        </>
    );
};

export default TourGridRightMain;
