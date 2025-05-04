"use client";
import Image from "next/image";
import React from "react";
import shapeCircle from "../../../public/assets/images/shapes/about-circle.png";
import shapePlane from "../../../public/assets/images/shapes/plane-9.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import TourPlanIcon from "@/svg/TourPlanIcon";

const AboutCtaArea = () => {
  return (
    <>
      <section className="bd-cta-area section-space-bottom cta-top fix">
        <div className="container">
          <div className="col-xl-12">
            <div className="cta-wrapper cta-item p-relative fix">
              <div className="cta-shape">
                <div className="cta-shape-one">
                  <Image
                    src={shapeCircle}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="shape"
                  />
                </div>
                <div className="cta-shape-two">
                  <Image
                    src={shapeCircle}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="shape"
                  />
                </div>
                <div className="cta-five-shape-one">
                  <TourPlanIcon />
                </div>
                <div className="cta-five-shape-two">
                  <Image
                    src={shapePlane}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="image"
                  />
                </div>
              </div>
              <div className="cta-item-box">
                <div className="section-title-wrapper p-relative z-index-11">
                  <h2 className="section-title white-text mb-5">
                    Lets Get Stared with Us.
                  </h2>
                  <h3 className="cta-subtitle">Call Us Now!</h3>
                </div>
                <div className="cta-btn text-center p-relative z-index-11">
                  <Link
                    href="/booking"
                    className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                  >
                    <span className="bd-primary-btn-arrow arrow-right">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="bd-primary-btn-text">Book Now</span>
                    <span className="bd-primary-btn-circle"></span>
                    <span className="bd-primary-btn-arrow arrow-left">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCtaArea;
