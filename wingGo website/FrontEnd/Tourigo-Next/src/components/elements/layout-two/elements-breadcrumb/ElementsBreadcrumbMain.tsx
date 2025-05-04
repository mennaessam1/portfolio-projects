import ElementBreadcrumb from "@/elements/ElementPages/ElementBreadcrumb";
import React from "react";
import BreadcrumbStyleOne from "./BreadcrumbStyleOne";
import BreadcrumbStyleTwo from "./BreadcrumbStyleTwo";
import BreadCrumbTitle from "./BreadCrumbTitle";

const ElementsBreadcrumbMain = () => {
  return (
    <>
      <div className="section-space-top"></div>
      <ElementBreadcrumb titleOne="Breadcrumb Elements" titleTwo="Breadcrumb" />
      <BreadCrumbTitle title="Breadcrumb Style 01" />
      <BreadcrumbStyleOne />
      <BreadCrumbTitle title="Breadcrumb Style 02" />
      <BreadcrumbStyleTwo />
      <div className="section-space-bottom"></div>
    </>
  );
};

export default ElementsBreadcrumbMain;
