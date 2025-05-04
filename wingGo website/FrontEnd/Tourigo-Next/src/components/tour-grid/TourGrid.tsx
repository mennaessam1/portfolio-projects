"use client";
import { tourData } from "@/data/tour-data";
import React from "react";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourGrid = () => {
  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            {tourData.slice(28, 40)?.map((item) => (
              <TourSingleCard
                tour={item}
                key={item?.id}
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6"
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

export default TourGrid;
