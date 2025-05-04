//BookingHistoryMain.tsx
import React from 'react';
import BookingHistory from './BookingHistory';
import DashBreadCrumb from '../common/breadcrumb/DashBreadCrumb';

const BookingHistoryMain = () => {
    return (
        <>
            <DashBreadCrumb titleOne='History' titleTwo='History' />
            <BookingHistory />
        </>
    );
};

export default BookingHistoryMain;
