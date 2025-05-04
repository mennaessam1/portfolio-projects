import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import DestinationsStyleOne from "./DestinationsStyleOne";
import DestinationsStyleTwo from "./DestinationsStyleTwo";
import DestinationsStyleThree from "./DestinationsStyleThree";
import DestinationsStyleFour from "./DestinationsStyleFour";
import DestinationsStyleFive from "./DestinationsStyleFive";
import DestinationsStyleSix from "./DestinationsStyleSix";

const ElementsDestinationsMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb
        titleOne="Destinations Elements"
        titleTwo="Destinations"
      />
      <DestinationsStyleOne />
      <DestinationsStyleTwo />
      <DestinationsStyleThree />
      <DestinationsStyleFour />
      <DestinationsStyleFive />
      <DestinationsStyleSix />
    </>
  );
};

export default ElementsDestinationsMain;
