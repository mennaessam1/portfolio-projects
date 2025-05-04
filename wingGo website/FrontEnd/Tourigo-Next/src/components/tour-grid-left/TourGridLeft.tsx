"use client";
import { tourData } from "@/data/tour-data";
import React from "react";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import { useSearch } from "@/hooks/useSearch";
import BookingFormModal from "@/elements/modals/BookingFormModal";

const TourGridLeft = () => {
  const filterData = tourData.slice(28, 40);
  const searchData = useSearch("tour");
  const mapData = searchData?.length ? searchData : filterData;
  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 order-lg-0 order-1">
              <SidebarSearchArea placeHolderTextData="Tour Place" />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 order-lg-1 order-0">
              <div className="row gy-24">
                {mapData?.map((item) => (
                  <TourSingleCard
                    tour={item}
                    key={item?.id}
                    className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                    tourWrapperClass="tour-wrapper style-one"
                    isparentClass={true}
                  />
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourGridLeft;
