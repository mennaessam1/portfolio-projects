import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import CheckoutArea from "./CheckoutArea";

const CheckoutMain = () => {
  return (
    <>
      <Breadcrumb titleOne="Checkout" titleTwo="Checkout" />
      <CheckoutArea />
    </>
  );
};

export default CheckoutMain;
