import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import CardstyleOne from "./CardstyleOne";
import CardstyleTwo from "./CardstyleTwo";
import CardstyleThree from "./CardstyleThree";

const ElementsCardMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Card Elements" titleTwo="Card" />
      <CardstyleOne />
      <CardstyleTwo />
      <CardstyleThree />
    </>
  );
};

export default ElementsCardMain;
