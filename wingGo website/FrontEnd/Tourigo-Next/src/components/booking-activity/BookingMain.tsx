//BookingMain.tsx
import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import Booking from './Booking';
import { idTypeNew } from "@/interFace/interFace";

const BookingMain = ({ id }: idTypeNew) => {
    return (
        <>
            <Breadcrumb titleOne='Booking Form' titleTwo='Activity Booking Form'/>
            <Booking id={id} />
        </>
    );
};

export default BookingMain;