"use client";
import React from "react";
import DestinationDetails from "../common/DestinationDetails";
import { idType } from "@/interFace/interFace";

const DestinationDetailsWrapper = ({ id }: idType) => {
  return (
    <>
      <section className="bd-destinations-details-area ">
        <div className="container">
          <div className="row gy-24 justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-10">
              <DestinationDetails id={id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationDetailsWrapper;
