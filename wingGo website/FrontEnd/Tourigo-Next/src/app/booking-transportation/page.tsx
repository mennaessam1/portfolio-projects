"use client";
import BookingMain from "@/components/booking-transportation/BookingMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const Booking = () => {
  const id = '';
  return (
    <>
      <MetaData pageTitle="Booking">
        <Wrapper>
          <main>
            <BookingMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default Booking;
