import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import DestinationsGrid from './DestinationsGrid';

const DestinationGridMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Destinations' titleTwo='Destinations' />
            <DestinationsGrid />
        </>
    );
};

export default DestinationGridMain;