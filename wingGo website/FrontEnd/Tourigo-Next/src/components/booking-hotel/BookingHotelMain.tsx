//BookingMain.tsx
import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';

import { idTypeNew } from "@/interFace/interFace";
import Booking from './Booking';

const BookingHotelMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Booking Form' titleTwo='Hotel Booking Form'/>
            <Booking  />
        </>
    );
};

export default BookingHotelMain;