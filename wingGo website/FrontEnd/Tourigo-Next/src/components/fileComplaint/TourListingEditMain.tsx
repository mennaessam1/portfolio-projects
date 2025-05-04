import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import ComplaintForm from "./TourDetailsArea";

const TourListingEditMain = () => {
  return (
    <>
      <Breadcrumb titleOne="File a complaint" titleTwo="Complaint details" />
      <ComplaintForm />
    </>
  );
};

export default TourListingEditMain;
