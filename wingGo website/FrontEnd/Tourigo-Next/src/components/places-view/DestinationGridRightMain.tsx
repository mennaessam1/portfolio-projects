import React from 'react';
import DestinationGridRight from './DestinationGridRight';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const DestinationGridRightMain = () => {
    return (
        <>
        <Breadcrumb titleOne='View Places' titleTwo='Explore different places' />
        <DestinationGridRight />
        </>
    );
};

export default DestinationGridRightMain;