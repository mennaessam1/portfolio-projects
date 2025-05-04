"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import DestinationDetailsRight from "./DestinationDetailsRight";
import { idType } from "@/interFace/interFace";

const DestinationDetailsRightMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb
        titleOne="Destinations Details"
        titleTwo="Destinations Details"
      />
      <DestinationDetailsRight id={id} />
    </>
  );
};

export default DestinationDetailsRightMain;
