"use client";
import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import DefaultFooter from "./DefaultFooter";
import DefaultFooterTwo from "./DefaultFooterTwo";
import FooterThree from "./FooterThree";
import StyleFour from "./StyleFour";
import FooterStyleFive from "./FooterStyleFive";

const ElementsFooterMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Footer Elements" titleTwo="Footer" />
      <DefaultFooter />
      <DefaultFooterTwo />
      <FooterThree />
      <StyleFour />
      <FooterStyleFive />
    </>
  );
};

export default ElementsFooterMain;
