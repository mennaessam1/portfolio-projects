import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import WhyChoseStyleOne from "./WhyChoseStyleOne";
import WhyChoseStyleTwo from "./WhyChoseStyleTwo";
import WhyChoseStyleThree from "./WhyChoseStyleThree";

const ElementsWhyChoseMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Why Chose Elements" titleTwo="Why Chose" />
      <WhyChoseStyleOne />
      <WhyChoseStyleTwo />
      <WhyChoseStyleThree />
    </>
  );
};

export default ElementsWhyChoseMain;
