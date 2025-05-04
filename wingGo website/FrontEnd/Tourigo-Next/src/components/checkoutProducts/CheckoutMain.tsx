"use client";

import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import CheckoutArea from "./CheckoutArea";

interface CheckoutMainProps {
  promoCode: string | null; // Accept promoCode as a prop
  orderId:string|null
}

const CheckoutMain: React.FC<CheckoutMainProps> = ({ promoCode,orderId }) => {
  return (
    <>
      <Breadcrumb titleOne="Checkout" titleTwo="Checkout" />
      <CheckoutArea promoCode={promoCode} orderId={orderId}/>
    </>
  );
};

export default CheckoutMain;
