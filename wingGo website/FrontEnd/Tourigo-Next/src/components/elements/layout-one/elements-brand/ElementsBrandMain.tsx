import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import BrandStyleOne from "./BrandStyleOne";
import BrandStyleTwo from "./BrandStyleTwo";
import BrandStyleThree from "./BrandStyleThree";
import BrandStyleFour from "./BrandStyleFour";

const ElementsBrandMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Brand Elements" titleTwo="Brand" />
      <BrandStyleOne />
      <BrandStyleTwo />
      <BrandStyleThree />
      <BrandStyleFour />
    </>
  );
};

export default ElementsBrandMain;
