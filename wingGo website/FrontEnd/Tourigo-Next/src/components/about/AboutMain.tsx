import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import AboutWrapper from "./AboutWrapper";
import VideoArea from "./VideoArea";
import AboutCtaArea from "./AboutCtaArea";
import TravelArea from "../shearedComponents/TravelArea";
import AboutTestimonial from "./AboutTestimonial";
import AboutTeamArea from "./AboutTeamArea";
import InstagramArea from "../shearedComponents/InstagramArea";
const AboutMain = () => {
  return (
    <>
      <Breadcrumb titleOne="About Us" titleTwo="About Us"/>
      <AboutWrapper />
      <VideoArea />
      <AboutCtaArea />
      <TravelArea />
      <AboutTestimonial />
      <AboutTeamArea />
      <InstagramArea />
    </>
  );
};

export default AboutMain;
