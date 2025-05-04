"use client";
import { tourData } from "@/data/tour-data";
import React from "react";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourAreaTwo = () => {
  return (
    <>
      <section className="bd-service-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Our Trips</span>
                <h2 className="section-title">Feature Packages</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {tourData &&
              tourData
                .slice(6, 14)
                .map((item) => (
                  <TourSingleCard
                    key={item?.id}
                    tour={item}
                    className="col-xxl-3 col-xl-4 col-lg-6 col-md-6"
                    tourWrapperClass="tour-wrapper style-one"
                    isparentClass={true}
                  />
                ))}
          </div>
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourAreaTwo;
