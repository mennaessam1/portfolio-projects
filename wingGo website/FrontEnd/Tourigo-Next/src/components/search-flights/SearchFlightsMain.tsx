import React from 'react';
import SearchFlights from './SearchFlights';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

const SearchFlightsMain = () => {
    return (
        <>
        <Breadcrumb titleOne='Search Flights' titleTwo='Search Flights' />
        <SearchFlights />
        </>
    );
};

export default SearchFlightsMain;