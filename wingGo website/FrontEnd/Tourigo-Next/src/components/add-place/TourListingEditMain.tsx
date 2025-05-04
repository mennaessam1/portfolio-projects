import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import TourDetailsArea from "./TourDetailsArea";

const TourListingEditMain = () => {
  return (
    <>
      <Breadcrumb titleOne="Add Place" titleTwo="Add Place" />
      <TourDetailsArea />
    </>
  );
};

export default TourListingEditMain;
