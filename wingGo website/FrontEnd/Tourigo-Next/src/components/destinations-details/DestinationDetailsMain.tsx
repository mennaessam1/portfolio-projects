"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import DestinationDetailsWrapper from "./DestinationDetailsWrapper";
import { idType } from "@/interFace/interFace";

const DestinationDetailsMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb
        titleOne="Destinations Details"
        titleTwo="Destinations Details"
      />
      <div className="section-space">
        <DestinationDetailsWrapper id={id} />
      </div>
    </>
  );
};

export default DestinationDetailsMain;
