import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import CounterStyleOne from "./CounterStyleOne";
import CounterStyleTwo from "./CounterStyleTwo";
import CounterStyleThree from "./CounterStyleThree";
import CounterStyleFour from "./CounterStyleFour";
import CounterStyleFive from "./CounterStyleFive";

const ElementsCounterMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Counter Elements" titleTwo="Counter" />
      <CounterStyleOne />
      <CounterStyleTwo />
      <CounterStyleThree />
      <CounterStyleFour />
      <CounterStyleFive />
    </>
  );
};

export default ElementsCounterMain;
