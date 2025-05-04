"use client";
import Image from "next/image";
import React from "react";
import chooseImg from "../../../public/assets/images/choose/choose-img-1.png";
import { imageLoader } from "@/hooks/image-loader";
import { chooseData } from "@/data/homeOne/why-choose-data";
import WhyChoseElementOne from "../common/whyChoseElement/WhyChoseElementOne";

const WhyChooseArea = () => {
  return (
    <>
      <section className="bd-choose-area section-space">
        <div className="container">
          <WhyChoseElementOne />
        </div>
      </section>
    </>
  );
};

export default WhyChooseArea;
