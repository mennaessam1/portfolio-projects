import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import FaqStyleOne from "./FaqStyleOne";
import FaqStyleTwo from "./FaqStyleTwo";
import FaqStyleThree from "./FaqStyleThree";
import FaqStyleFour from "./FaqStyleFour";
import FaqStyleFive from "./FaqStyleFive";
import FaqStyleSix from "./FaqStyleSix";
import FaqStyleSeven from "./FaqStyleSeven";

const ElementsAccordionMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="FAQ Elements" titleTwo="FAQ" />
      <FaqStyleOne />
      <FaqStyleTwo />
      <FaqStyleThree />
      <FaqStyleFour />
      <FaqStyleFive />
      <FaqStyleSix />
      <FaqStyleSeven />
    </>
  );
};

export default ElementsAccordionMain;
