import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import SocialStyleOne from "./SocialStyleOne";
import SocialStyleTwo from "./SocialStyleTwo";
import SocialStyleThree from "./SocialStyleThree";
import SocialStyleFour from "./SocialStyleFour";

const ElementsSocialMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Social Elements" titleTwo="Social" />
      <SocialStyleOne />
      <SocialStyleTwo />
      <SocialStyleThree />
      <SocialStyleFour />
    </>
  );
};

export default ElementsSocialMain;
