import React from "react";
import BannerOne from "./BannerOne";
import ActivityArea from "./ActivityArea";
import AboutCompany from "./AboutCompany";
import TourArea from "./TourArea";
import OfferArea from "./OfferArea";
import TripArea from "./TripArea";
import CounterArea from "./CounterArea";
import WhyChooseArea from "./WhyChooseArea";
import BlogArea from "./BlogArea";
import TravelArea from "../shearedComponents/TravelArea";
import TestimonialElementOne from "../common/testimonials/TestimonialElementOne";
import CtaElementOne from "../common/ctaElements/CtaElementOne";
const HomeMain = () => {
  return (
    <>
      <BannerOne />
      <CounterArea />
      <WhyChooseArea />
      <TravelArea />
    </>
  );
};

export default HomeMain;
