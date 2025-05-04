import React from 'react';
import DestinationGridLeft from './DestinationGridLeft';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const DestinationGridLeftMain = () => {
    return (
        <>
        <Breadcrumb titleOne='Destinations Grid Left' titleTwo='Destinations Grid Left' />
        <DestinationGridLeft />
        </>
    );
};

export default DestinationGridLeftMain;