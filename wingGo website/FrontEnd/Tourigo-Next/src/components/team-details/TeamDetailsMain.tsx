import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import TeamDetails from "./TeamDetails";
import TeamDetailsArea from "./TeamDetailsArea";
import CtaAreaStyleOne from "../shearedComponents/CtaAreaStyleOne";
import { idType } from "@/interFace/interFace";

const TeamDetailsMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb titleOne="Team Details" titleTwo="Team Details" />
      <TeamDetails id={id} />
      <TeamDetailsArea />
      <CtaAreaStyleOne />
    </>
  );
};

export default TeamDetailsMain;
