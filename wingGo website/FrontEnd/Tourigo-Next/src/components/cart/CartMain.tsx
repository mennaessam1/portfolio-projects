import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import CartArea from "./CartArea";

const CartMain = () => {
  return (
    <>
      <Breadcrumb titleOne="Cart" titleTwo="Cart" />
      <CartArea />
    </>
  );
};

export default CartMain;
