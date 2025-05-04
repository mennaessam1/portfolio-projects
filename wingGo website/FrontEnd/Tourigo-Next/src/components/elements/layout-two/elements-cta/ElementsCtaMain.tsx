import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import CtaStyleOne from "./CtaStyleOne";
import CtaStyleTwo from "./CtaStyleTwo";
import CtaStyleThree from "./CtaStyleThree";
import CtaStyleFour from "./CtaStyleFour";
import CtaStyleFive from "./CtaStyleFive";
import CtaStyleSix from "./CtaStyleSix";
import CtaStyleSeven from "./CtaStyleSeven";
import CtaStyleEight from "./CtaStyleEight";

const ElementsCtaMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="CTA Elements" titleTwo="Call To Action" />
      <CtaStyleOne />
      <CtaStyleTwo />
      <CtaStyleThree />
      <CtaStyleFour />
      <CtaStyleFive />
      <CtaStyleSix />
      <CtaStyleSeven />
      <CtaStyleEight />
    </>
  );
};

export default ElementsCtaMain;
