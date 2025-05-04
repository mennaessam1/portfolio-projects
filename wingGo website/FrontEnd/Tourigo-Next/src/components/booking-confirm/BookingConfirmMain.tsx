import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BookingConfirm from './BookingConfirm';

const BookingConfirmMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Booking Confirmation' titleTwo='Booking' />
            <BookingConfirm />
        </>
    );
};

export default BookingConfirmMain;