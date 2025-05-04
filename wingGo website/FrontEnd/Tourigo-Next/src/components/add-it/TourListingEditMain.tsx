import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import TourDetailsArea from "./TourDetailsArea";

const TourListingEditMain = () => {
  return (
    <>
      <Breadcrumb titleOne="Add Itinerary" titleTwo="Creating a new itinerary" />
      <TourDetailsArea />
    </>
  );
};

export default TourListingEditMain;
