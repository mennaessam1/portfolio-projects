import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import PricingCard from "./PricingCard";

const PricingMain = () => {
  return (
    <>
      <Breadcrumb titleOne="Price Plan Elements" titleTwo="Price Plan" />
      <PricingCard />
    </>
  );
};

export default PricingMain;
