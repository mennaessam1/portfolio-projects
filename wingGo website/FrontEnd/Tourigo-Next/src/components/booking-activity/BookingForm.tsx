//BookingForm.tsx

import BookingComponentForm from "./BookingComponentFormAct";
import Link from "next/link";
import React from "react";
import { idTypeNew } from "@/interFace/interFace";

const BookingForm = ({ id }: idTypeNew) => {
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
        <BookingComponentForm id={id}/>
      </div>
    </>
  );
};

export default BookingForm;
