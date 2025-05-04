import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import BlogStyleOne from "./BlogStyleOne";
import BlogStyleTwo from "./BlogStyleTwo";
import BlogStyleThree from "./BlogStyleThree";
import BlogStyleFour from "./BlogStyleFour";
import BlogStyleFive from "./BlogStyleFive";
import BlogStyleSix from "./BlogStyleSix";
import BlogStyleSeven from "./BlogStyleSeven";

const ElementsBlogMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Blog Elements" titleTwo="Blog" />
      <BlogStyleOne />
      <BlogStyleTwo />
      <BlogStyleThree />
      <BlogStyleFour />
      <BlogStyleFive />
      <BlogStyleSix />
      <BlogStyleSeven />
    </>
  );
};

export default ElementsBlogMain;
