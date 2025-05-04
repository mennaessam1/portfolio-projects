"use client";
import React from "react";
import stone from "../../../../../public/assets/images/shapes/stone.png";
import circle from "../../../../../public/assets/images/shapes/circle.png";
import plane from "../../../../../public/assets/images/shapes/plane-3.png";
import camera from "../../../../../public/assets/images/shapes/camera-2.png";
import aboutOne from "../../../../../public/assets/images/about/about-img-1.png";
import aboutTwo from "../../../../../public/assets/images/about/about-img-2.png";
import whiteBadge from "../../../../../public/assets/images/shapes/white-badge.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const AboutStyleOne = () => {
  return (
    <>
      <div className="elements-area section-space fix">
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
        <div className="bd-about-area section-space about-bg p-relative fix image-bg">
          <div className="container">
            <div className="about-shape">
              <div className="about-shape-one">
                <Image
                  src={stone}
                  alt="shape"
                  loader={imageLoader}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="about-shape-two">
                <Image
                  src={circle}
                  alt="shape"
                  loader={imageLoader}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="about-shape-three">
                <Image
                  src={plane}
                  alt="shape"
                  loader={imageLoader}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="about-shape-four">
                <Image
                  src={camera}
                  alt="shape"
                  loader={imageLoader}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
            <div className="row gy-24 align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="about-thumb-wrap about-style">
                  <div className="about-thumb-one wow img-custom-anim-left">
                    <Image
                      src={aboutOne}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-thumb-two wow img-custom-anim-right image-hover-effect">
                    <Image
                      src={aboutTwo}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-text">
                    <h5 className="about-text-title">12+ Successful Years</h5>
                  </div>
                  <div className="about-badge">
                    <Image
                      src={whiteBadge}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                    <div className="about-badge-text">
                      <span className="number">30%</span>
                      <span>Discount</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-content">
                  <div className="section-title-wrapper mb-35">
                    <span className="section-subtitle mb-15">
                      About Our Company
                    </span>
                    <h2 className="section-title mb-20">
                      Mapping Adventures, Making Moments
                    </h2>
                    <p>
                      Share the core values and principles that drive your
                      company. Emphasize a commitment to customer satisfaction,
                      responsible tourism, or any unique approach you have
                      towards travel.
                    </p>
                  </div>
                  <div className="about-feature-list">
                    <ul>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <p>
                          Discuss your commitment to excellent customer service.
                        </p>
                      </li>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <p>Share the core values that guide your business.</p>
                      </li>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        <p>
                          Mention any partnerships with hotels, airlines, or
                          local guides
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="about-btn-wrap">
                    <div className="about-btn">
                      <Link
                        href="/contact"
                        className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                      >
                        <span className="bd-primary-btn-arrow arrow-right">
                          <i className="fa-regular fa-arrow-right"></i>
                        </span>
                        <span className="bd-primary-btn-text">Know More</span>
                        <span className="bd-primary-btn-circle"></span>
                        <span className="bd-primary-btn-arrow arrow-left">
                          <i className="fa-regular fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                    <div className="about-call">
                      <span>
                        <i className="icon-support"></i>
                      </span>
                      <Link className="fw-5" href="tel:18004536744">
                        1-800-453-6744
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutStyleOne;
