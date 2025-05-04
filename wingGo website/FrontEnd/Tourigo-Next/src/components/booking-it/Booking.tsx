//Booking.tsx
'use client'
import React from 'react';
import BookingSidebar from './BookingSidebar';
import BookingForm from './BookingForm';
import { idTypeNew } from "@/interFace/interFace";

const Booking = ({ id }: idTypeNew) => {
    return (
        <>
            <section className="bd-booking-form-area section-space">
                <div className="container">
                    <div className="row gy-24 justify-content-between">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <BookingForm id={id} />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <BookingSidebar id={id} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;