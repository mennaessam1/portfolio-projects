import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import AboutStyleOne from "./AboutStyleOne";
import AboutStyleTwo from "./AboutStyleTwo";
import AboutStyleThree from "./AboutStyleThree";

const ElementsAboutMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="About Elements" titleTwo="About" />
      <AboutStyleOne />
      <AboutStyleTwo />
      <AboutStyleThree />
    </>
  );
};

export default ElementsAboutMain;
