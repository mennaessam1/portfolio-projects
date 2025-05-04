"use client";
import React from "react";
import aboutThree from "../../../../../public/assets/images/about/about-img-3.png";
import aboutFour from "../../../../../public/assets/images/about/about-img-4.png";
import aboutShape from "../../../../../public/assets/images/shapes/about-shape.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";

const AboutStyleTwo = () => {
  return (
    <>
      <div className="elements-area section-space-bottom fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      About style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="bd-about-area flash-white section-space">
          <div className="container">
            <div className="row gy-24 justify-content-between">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                <div className="about-thumb-wrap about-style-two">
                  <div className="about-thumb-one">
                    <Image
                      src={aboutThree}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-thumb-two">
                    <Image
                      src={aboutFour}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-icon-badge">
                    <span>
                      <i className="icon-world"></i>
                    </span>
                  </div>
                  <div className="about-shape">
                    <Image
                      src={aboutShape}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-experience">
                    <h2 className="about-experience-title">26</h2>
                    <span className="about-experience-subtitle">
                      Years of <br /> Experience
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12">
                <div className="section-title-wrapper mb-35">
                  <span className="section-subtitle mb-15">About Us</span>
                  <h2 className="section-title mb-20">
                    Discover Limitless Possibilities with Tourigo.
                  </h2>
                </div>
                <div className="about-list">
                  <ul>
                    <li>
                      <span className="about-list-icon">
                        <i className="icon-life-jacket"></i>
                      </span>
                      <div>
                        <span className="about-list-title mb-5">
                          Excellent Security
                        </span>
                        <span className="about-list-subtitle">
                          Share the core values and principles that drive your
                          company. Emphasize a commitment to customer.
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="about-list-icon">
                        <i className="fa-light fa-badge-dollar"></i>
                      </span>
                      <div>
                        <span className="about-list-title mb-5">
                          Cost Efficiency
                        </span>
                        <span className="about-list-subtitle">
                          Share the core values and principles that drive your
                          company. Emphasize a commitment to customer.
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="about-list-icon">
                        <i className="icon-trip"></i>
                      </span>
                      <span>
                        <span className="about-list-title mb-5">
                          World Wide Route
                        </span>
                        <span className="about-list-subtitle">
                          Share the core values and principles that drive your
                          company. Emphasize a commitment to customer.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutStyleTwo;
