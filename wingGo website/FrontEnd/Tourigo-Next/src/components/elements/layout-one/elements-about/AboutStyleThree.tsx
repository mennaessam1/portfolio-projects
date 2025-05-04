"use client";
import React from "react";
import aboutSevent from "../../../../../public/assets/images/about/about-img-7.png";
import aboutEight from "../../../../../public/assets/images/about/about-img-8.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const AboutStyleThree = () => {
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
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12">
                <div className="about-content-wrapper">
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
                        href="/booking"
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
              <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12">
                <div className="about-thumb-wrapper about-style-three">
                  <div className="about-thumb-seven wow img-custom-anim-left">
                    <Image
                      src={aboutSevent}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="about-thumb-eight wow img-custom-anim-right">
                    <Image
                      src={aboutEight}
                      alt="shape"
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                    />
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

export default AboutStyleThree;
