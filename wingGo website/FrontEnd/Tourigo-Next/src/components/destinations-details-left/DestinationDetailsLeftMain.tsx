"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import DestinationDetailsLeft from "./DestinationDetailsLeft";
import { idType } from "@/interFace/interFace";

const DestinationDetailsLeftMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb
        titleOne="Destinations Details Left"
        titleTwo="Destinations Details Left"
      />
      <DestinationDetailsLeft id={id} />
    </>
  );
};

export default DestinationDetailsLeftMain;
