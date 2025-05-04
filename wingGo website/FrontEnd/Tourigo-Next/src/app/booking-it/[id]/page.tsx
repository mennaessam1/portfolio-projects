"use client";
import BookingMain from "@/components/booking-it/BookingMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
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

export default page;
