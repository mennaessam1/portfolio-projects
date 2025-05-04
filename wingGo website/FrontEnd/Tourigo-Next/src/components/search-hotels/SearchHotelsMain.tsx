import React from 'react';
import SearchHotels from './SearchHotels';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const SearchFlightsMain = () => {
    return (
        <>
        <Breadcrumb titleOne='Search Hotels' titleTwo='Search Hotels' />
        <SearchHotels />
        </>
    );
};

export default SearchFlightsMain;