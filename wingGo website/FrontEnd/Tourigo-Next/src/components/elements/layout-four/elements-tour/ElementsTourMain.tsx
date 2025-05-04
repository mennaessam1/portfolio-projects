import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import TourStyleOne from "./TourStyleOne";
import TourStyleTwo from "./TourStyleTwo";
import TourStyleThree from "./TourStyleThree";
import TourStyleFour from "./TourStyleFour";
import TourStyleFive from "./TourStyleFive";
import TourStyleSix from "./TourStyleSix";
const ElementsTourMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Tour Elements" titleTwo="Tour" />
      <TourStyleOne />
      <TourStyleTwo />
      <TourStyleThree />
      <TourStyleFour />
      <TourStyleFive />
      <TourStyleSix />
    </>
  );
};

export default ElementsTourMain;
