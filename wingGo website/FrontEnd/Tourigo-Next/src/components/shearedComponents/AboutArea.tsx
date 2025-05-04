"use client";
import React from "react";
import aboutImgThree from "../../../public/assets/images/about/about-img-3.png";
import aboutImgFour from "../../../public/assets/images/about/about-img-4.png";
import aboutShape from "../../../public/assets/images/shapes/about-shape.png";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";

const AboutArea = () => {
  return (
    <>
      <div className="row gy-24 justify-content-between">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 wow bdFadeInLeft">
          <div className="about-thumb-wrap about-style-two">
            <div className="about-thumb-one">
              <Image
                src={aboutImgThree}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="image"
              />
            </div>
            <div className="about-thumb-two">
              <Image
                src={aboutImgFour}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="image"
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
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
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
                  <span className="about-list-title mb-5">Cost Efficiency</span>
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
    </>
  );
};

export default AboutArea;
