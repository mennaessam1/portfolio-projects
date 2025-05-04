import TourSingleCard from "@/components/common/tourElements/TourSingleCard";
import { tourData } from "@/data/tour-data";
import BookingFormModal from "@/elements/modals/BookingFormModal";
import React from "react";

const TourStyleOne = () => {
  const tourListingData = tourData.slice(28, 32);
  return (
    <>
      <section className="element-Tour-area section-space">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Tour Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {tourListingData?.map((item) => (
              <TourSingleCard
                key={item?.id}
                tour={item}
                className="col-xxl-3 col-xl-3 col-lg-6 col-md-6"
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

export default TourStyleOne;
