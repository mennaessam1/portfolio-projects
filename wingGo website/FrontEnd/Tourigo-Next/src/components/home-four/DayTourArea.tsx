import { dayTourData } from "@/data/homeFour/day-tour-data";
import React from "react";
import TourSingleCardStripeBorder from "../common/tourElements/TourSingleCardStripeBorder";

const DayTourArea = () => {
  return (
    <>
      <section className="bd-tour-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Day Tour</span>
                <h2 className="section-title">Enjoy Day Adventure</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {dayTourData &&
              dayTourData.map((item) => (
                <TourSingleCardStripeBorder key={item?.id} item={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DayTourArea;
