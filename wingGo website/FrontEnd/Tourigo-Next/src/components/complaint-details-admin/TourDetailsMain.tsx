// TourDetailsMain.tsx
import React from "react";
import ComplaintDetails  from "./TourDetails";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import { idTypeNew } from "@/interFace/interFace";

const ComplaintDetailsMain  = ({ id }: idTypeNew) => {
  return (
    <>
      <Breadcrumb titleOne="Complaint Details" titleTwo="Details" />
      <ComplaintDetails  id={id} />
    </>
  );
};

export default ComplaintDetailsMain ;
