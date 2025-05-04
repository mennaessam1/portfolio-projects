import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import DefaultForm from "./DefaultForm";
import FromLabelTop from "./FromLabelTop";
import FromLabelLeftSide from "./FromLabelLeftSide";
import DefaultFromwithIconLeft from "./DefaultFromwithIconLeft";
import DefaultFromwithIconRight from "./DefaultFromwithIconRight";
import FromwithFloatingLabel from "./FromwithFloatingLabel";

const ElementsFormMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Form Elements" titleTwo="Form" />
      <DefaultForm />
      <FromLabelTop />
      <FromLabelLeftSide />
      <DefaultFromwithIconLeft />
      <DefaultFromwithIconRight />
      <FromwithFloatingLabel />
    </>
  );
};

export default ElementsFormMain;
