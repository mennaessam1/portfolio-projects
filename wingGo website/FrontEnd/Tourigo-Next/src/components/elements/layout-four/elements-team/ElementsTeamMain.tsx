import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import TeamStyleOne from "./TeamStyleOne";
import TeamStyleTwo from "./TeamStyleTwo";
import TeamStyleThree from "./TeamStyleThree";
import TeamStyleFour from "./TeamStyleFour";
import TeamStyleFive from "./TeamStyleFive";
import TeamStyleSix from "./TeamStyleSix";
import TeamStyleSeven from "./TeamStyleSeven";

const ElementsTeamMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Team Elements" titleTwo="Team" />
      <TeamStyleOne />
      <TeamStyleTwo />
      <TeamStyleThree />
      <TeamStyleFour />
      <TeamStyleFive />
      <TeamStyleSix />
      <TeamStyleSeven />
    </>
  );
};

export default ElementsTeamMain;
