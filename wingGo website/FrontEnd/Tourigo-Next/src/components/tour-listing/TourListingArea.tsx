import { tourData } from "@/data/tour-data";
import React from "react";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import SearchFilterTwo from "../shearedComponents/SearchFilterTwo";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourListingArea = () => {
  return (
    <>
      <section className="bd-tour-listing-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-xl-10 col-lg-11">
              <div className="banner-search-wrapper style-two w-100 section-space-bottom">
                <SearchFilterTwo wrapperClass="box-shadow" />
              </div>
            </div>
          </div>
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

export default TourListingArea;
