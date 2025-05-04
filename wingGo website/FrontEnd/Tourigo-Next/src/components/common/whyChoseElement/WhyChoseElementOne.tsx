"use client";
import Image from "next/image";
import React from "react";
import chooseImg from "../../../../public/assets/images/choose/choose-img-1.png";
import { imageLoader } from "@/hooks/image-loader";
import { chooseData } from "@/data/homeOne/why-choose-data";

const WhyChoseElementOne = () => {
  return (
    <>
      <div className="row gy-24 align-items-center justify-content-between">
        <div
          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 wow bdFadeInLeft"
          data-wow-delay=".3s"
        >
          <div className="section-title-wrapper section-title-space">
            <span className="section-subtitle mb-10">Why choose us</span>
            <h2 className="section-title mb-20">Your Ultimate Tour Agency</h2>
            <p>
              Choose us for an unparalleled travel experience tailored to your
              desires. With our commitment to excellence, extensive destination
              knowledge, and personalized service.
            </p>
          </div>
          <div className="choose-list">
            <ul>
              <li>Personalized Service</li>
              <li>Destination Knowledge</li>
              <li>Hassle-Free Planning</li>
              <li>24/7 Support</li>
              <li>Customer Satisfaction Guaranteed</li>
            </ul>
          </div>
        </div>
      
        <div
          className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 wow bdFadeInRight"
          data-wow-delay=".5s"
        >
          <div className="choose-feature-list about-list">
            <ul>
              {chooseData &&
                chooseData.map((item) => (
                  <li key={item.id}>
                    <span className="about-list-icon">
                      <i className={item.icon}></i>
                    </span>
                    <span>
                      <span className="about-list-title mb-5">
                        {item.title}
                      </span>
                      <span className="about-list-subtitle">
                        {item.subTitle}
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoseElementOne;
