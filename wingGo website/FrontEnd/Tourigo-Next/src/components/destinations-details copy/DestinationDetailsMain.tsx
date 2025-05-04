"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import DestinationDetails from "../common/DestinationDetails";
import { idType } from "@/interFace/interFace";

const DestinationDetailsMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb
        titleOne="Destinations Details"
        titleTwo="Destinations Details"
      />
      <DestinationDetails id={id} />
    </>
  );
};

export default DestinationDetailsMain;
