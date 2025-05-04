import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import AdanceTabOne from "./AdanceTabOne";
import AdanceTabTwo from "./AdanceTabTwo";
import AdanceTabThree from "./AdanceTabThree";

const ElementsAdvanceTabMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Tab Elements" titleTwo="Advance Tab" />
      <AdanceTabOne />
      <AdanceTabTwo />
      <AdanceTabThree />
    </>
  );
};

export default ElementsAdvanceTabMain;
