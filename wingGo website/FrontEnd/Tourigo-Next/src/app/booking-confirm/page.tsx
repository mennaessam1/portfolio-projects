import BookingConfirmMain from "@/components/booking-confirm/BookingConfirmMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const BookingConfirm = () => {
  return (
    <>
      <MetaData pageTitle="Booking Confirm">
        <Wrapper>
          <main>
            <BookingConfirmMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default BookingConfirm;
