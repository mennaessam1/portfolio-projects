"use client";
import React from "react";
import TourSingleCardPhotoView from "../common/tourElements/TourSingleCardPhotoView";
const DestinationAreaFive = () => {
  return (
    <>
      <section className="bd-service-area section-space fix">
        <div className="container">
          <div className="row gy-24 text-center justify-content-center section-title-space">
            <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Top Destinations</span>
                <h2 className="section-title">
                  Dive into Our Range of Activities
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <TourSingleCardPhotoView />
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationAreaFive;
