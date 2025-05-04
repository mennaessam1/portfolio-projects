import React from "react";
import TourDetails from "./TourDetails";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import { idType } from "@/interFace/interFace";

const TourDetailsMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb titleOne="Tour Details" titleTwo="Tour Details" />
      <TourDetails id={id} />
    </>
  );
};

export default TourDetailsMain;
