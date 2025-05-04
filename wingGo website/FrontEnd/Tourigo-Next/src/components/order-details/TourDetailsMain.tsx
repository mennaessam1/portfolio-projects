// TourDetailsMain.tsx
import React from "react";
import OrderDetails  from "./TourDetails";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import { idTypeNew } from "@/interFace/interFace";

const OrderDetailsMain  = ({ id }: idTypeNew) => {
  return (
    <>
      <Breadcrumb titleOne="Order Details" titleTwo="Details" />
      <OrderDetails  id={id} />
    </>
  );
};

export default OrderDetailsMain ;
