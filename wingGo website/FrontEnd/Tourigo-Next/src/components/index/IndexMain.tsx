import React from "react";
import DemoPresentation from "./DemoPresentation";
import DemoBannerArea from "./DemoBannerArea";
import ShowCaseArea from "./ShowCaseArea";
import TopFeatureArea from "./TopFeatureArea";
import TopElement from "./TopElement";
import ReviewArea from "./ReviewArea";
import FaqAreaIndex from "./FaqAreaIndex";
import OffCanvasArea from "./OffCanvasArea";

const IndexMain = () => {
  return (
    <>
      <OffCanvasArea />
      <DemoBannerArea />
      <DemoPresentation />
      <ShowCaseArea />
      <TopFeatureArea />
      <TopElement />
      <ReviewArea />
      <FaqAreaIndex />
    </>
  );
};

export default IndexMain;
