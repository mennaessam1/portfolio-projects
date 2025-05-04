import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import TestimonialStyleOne from "./TestimonialStyleOne";
import TestimonialStyleTwo from "./TestimonialStyleTwo";
import TestimonialStyleThree from "./TestimonialStyleThree";
import TestimonialStyleFour from "./TestimonialStyleFour";
import TestimonialStyleFive from "./TestimonialStyleFive";
import TestimonialStyleSix from "./TestimonialStyleSix";
import TestimonialStyleSeven from "./TestimonialStyleSeven";
import TestimonialStyleEight from "./TestimonialStyleEight";
import TestimonialStyleNine from "./TestimonialStyleNine";
import TestimonialStyleTen from "./TestimonialStyleTen";

const ElementsTestimonialMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Team Elements" titleTwo="Testimonial" />
      <TestimonialStyleOne />
      <TestimonialStyleTwo />
      <TestimonialStyleThree />
      <TestimonialStyleFour />
      <TestimonialStyleFive />
      <TestimonialStyleSix />
      <TestimonialStyleSeven />
      <TestimonialStyleEight />
      <TestimonialStyleNine />
      <TestimonialStyleTen />
    </>
  );
};

export default ElementsTestimonialMain;
