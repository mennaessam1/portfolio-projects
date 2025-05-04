"use client";
import React from "react";
import destination4 from "../../../../../public/assets/images/destination/destination-img-4.png";
import destination5 from "../../../../../public/assets/images/destination/destination-img-5.png";
import destination6 from "../../../../../public/assets/images/destination/destination-img-6.png";
import destination7 from "../../../../../public/assets/images/destination/destination-img-7.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const DestinationsStyleFive = () => {
  return (
    <>
      <section className="element-Destinations-area section-space-bottom">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Destinations Style 05
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style-five">
                <div className="activity-thumb image-overly">
                  <Link href="#">
                    <Image
                      src={destination4}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap">
                  <h6 className="activity-title white-text underline-two">
                    <Link href="#">Paris Adventure</Link>
                  </h6>
                  <p className="activity-location">
                    <span>
                      <i className="icon-location-fill"></i>
                    </span>
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style-five">
                <div className="activity-thumb image-overly">
                  <Link href="#">
                    <Image
                      src={destination5}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap">
                  <h6 className="activity-title white-text underline-two">
                    <Link href="#">Paris Adventure</Link>
                  </h6>
                  <p className="activity-location">
                    <span>
                      <i className="icon-location-fill"></i>
                    </span>
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style-five">
                <div className="activity-thumb image-overly">
                  <Link href="#">
                    <Image
                      src={destination6}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap">
                  <h6 className="activity-title white-text underline-two">
                    <Link href="#">Paris Adventure</Link>
                  </h6>
                  <p className="activity-location">
                    <span>
                      <i className="icon-location-fill"></i>
                    </span>
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style-five">
                <div className="activity-thumb image-overly">
                  <Link href="#">
                    <Image
                      src={destination7}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap">
                  <h6 className="activity-title white-text underline-two">
                    <Link href="#">Paris Adventure</Link>
                  </h6>
                  <p className="activity-location">
                    <span>
                      <i className="icon-location-fill"></i>
                    </span>
                    Paris, France
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationsStyleFive;
