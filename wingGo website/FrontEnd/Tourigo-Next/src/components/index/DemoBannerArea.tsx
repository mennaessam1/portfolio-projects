"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import React from "react";
import SunImg from "../../../public/assets/images/shapes/sun.png";
import SkyImg from "../../../public/assets/images/shapes/sky.png";
import PlaneImg from "../../../public/assets/images/shapes/plane.png";
import DotSquareImg from "../../../public/assets/images/shapes/dot-square.png";
import awardImg from "../../../public/assets/images/landing-page/banner/award.png";
import laptopImg from "../../../public/assets/images/landing-page/banner/laptop.png";
import mobileImg from "../../../public/assets/images/landing-page/banner/mobile.png";
import dataBgImage from "../../../public/assets/images/landing-page/index-bg.png";
import Link from "next/link";

const DemoBannerArea = () => {
  return (
    <>
      <div
        className="bd-demo-banner-area position-relative fix"
        style={{ backgroundImage: `url(${dataBgImage.src})` }}
      >
        <div className="container">
          <div className="banner-shape demo-banner-shape">
            <div className="banner-shape-one">
              <Image
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                src={SunImg}
                alt="image"
              />
            </div>
            <div className="banner-shape-two">
              <Image
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                src={SkyImg}
                alt="image"
              />
            </div>
            <div className="banner-shape-six">
              <Image
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                src={PlaneImg}
                alt="image"
              />
            </div>
            <div className="banner-shape-eight">
              <Image
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                src={DotSquareImg}
                alt="image"
              />
            </div>
          </div>
          <div className="row gy-5 align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="bd-demo-banner-content">
                <div
                  className="demo-banner-top-inner wow bdFadeInUp"
                  data-wow-delay=".3s"
                >
                  <div className="demo-banner-top">
                    <div className="bd-icon">
                      <i className="icon-star"></i>
                      <i className="icon-star"></i>
                      <i className="icon-star"></i>
                      <i className="icon-star"></i>
                      <i className="icon-star"></i>
                    </div>
                    <div className="content">
                      <span className="subtitle">8750+ Trust Customer</span>
                    </div>
                  </div>
                  <div className="demo-banner-top">
                    <div className="icon">
                      <Image src={awardImg} alt="image" />
                    </div>
                    <div className="content">
                      <span className="subtitle">#1 Top New theme</span>
                    </div>
                  </div>
                </div>
                <div className="content wow bdFadeInUp" data-wow-delay=".4s">
                  <h1 className="demo-banner-title mb-15">
                    Tourigo - Travel and Tour Next js Template
                  </h1>
                  <p>
                    Embark on a seamless voyage into the world of travel with
                    Tourigo, a cutting-edge Tour & Travel Bootstrap 5 Template
                    that elevates your website to new heights. Crafted with
                    precision and designed for versatility, Tourigo is your
                    passport to creating a stunning online presence for your
                    travel agency, tour operator, or any travel-related
                    business.
                  </p>
                </div>
                <div
                  className="demo-banner-btn smooth mt-30 wow bdFadeInUp"
                  data-wow-delay=".6s"
                >
                  <Link
                    href="#homesDemos"
                    className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                  >
                    <span className="bd-primary-btn-arrow arrow-right">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="bd-primary-btn-text">See Live Demos</span>
                    <span className="bd-primary-btn-circle"></span>
                    <span className="bd-primary-btn-arrow arrow-left">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="demo-banner-thumb-wrapper position-relative z-index-5">
                <div
                  className="thumbnail wow bdFadeInRight"
                  data-wow-delay=".3s"
                >
                  <Image
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    src={laptopImg}
                    alt="image"
                  />
                </div>
                <div
                  className="mobile-thumb wow bdFadeInUp"
                  data-wow-delay=".5s"
                >
                  <Image
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    src={mobileImg}
                    alt="image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoBannerArea;
