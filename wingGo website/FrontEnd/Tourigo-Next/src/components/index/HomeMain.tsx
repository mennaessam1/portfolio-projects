import React from "react";
import DemoPresentation from "./DemoPresentation";
import DemoBannerArea from "./DemoBannerArea";
import ShowCaseArea from "./ShowCaseArea";
import TopFeatureArea from "./TopFeatureArea";
import TopElement from "./TopElement";
import ReviewArea from "./ReviewArea";
import FaqAreaIndex from "./FaqAreaIndex";
import FooterArea from "../../layout/footer/FooterArea";
import HeaderArea from "../../layout/header/HeaderArea";
import OffCanvasArea from "./OffCanvasArea";

const HomeMain = () => {
  return (
    <>
      <HeaderArea />
      <OffCanvasArea />
      <DemoBannerArea />
      <DemoPresentation />
      <ShowCaseArea />
      <TopFeatureArea />
      <TopElement />
      <ReviewArea />
      <FaqAreaIndex />
      <FooterArea />
    </>
  );
};

export default HomeMain;
