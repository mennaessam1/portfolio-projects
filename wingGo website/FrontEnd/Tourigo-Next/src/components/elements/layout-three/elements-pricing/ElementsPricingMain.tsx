import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import PricingStyleOne from "./PricingStyleOne";
import PricingStyleTwo from "./PricingStyleTwo";

const ElementsPricingMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Pricing Elements" titleTwo="Pricing" />
      <PricingStyleOne />
      <PricingStyleTwo />
    </>
  );
};

export default ElementsPricingMain;
