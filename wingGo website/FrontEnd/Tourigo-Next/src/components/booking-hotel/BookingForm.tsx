//BookingForm.tsx

import BookingComponentForm from "./BookingComponentFormHotel";
import Link from "next/link";
import React from "react";
import { idTypeNew } from "@/interFace/interFace";

const BookingForm = () => {
  return (
    <>
      <div className="booking-form">
        {/*Stepper*/}
        <div className="steps-form mb-20">
          <div className="steps-row style_two setup-panel d-flex">
            <div className="steps-step">
              
            </div>
            <div className="steps-step">
              
            </div>
          </div>
        </div>

        {/* booking form */}
        <BookingComponentForm />
      </div>
    </>
  );
};

export default BookingForm;
