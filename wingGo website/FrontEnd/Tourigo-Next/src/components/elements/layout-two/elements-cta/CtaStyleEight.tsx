"use client";
import React from "react";
import newsLetter from "../../../../../public/assets/images/newsletter/newsletter-01.png";
import newsLatterIcon from "../../../../../public/assets/images/bg/newslatter-2-bg.jpg";
import Image from "next/image";
import BotIcon from "@/svg/BotIcon";
import { imageLoader } from "@/hooks/image-loader";
const CtaStyleEight = () => {
  return (
    <>
      <section className="cta-area section-space-bottom p-relative z-index-11 fix">
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
                      CTA Style 08
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="newsletter-wrapper-2 mt-150 p-relative z-index-11">
            <div
              className="newsletter-bg-2"
              style={{ backgroundImage: `url(${newsLatterIcon.src})` }}
            ></div>
            <div className="row gy-24 align-items-center">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                <div className="newsletter-thumb-wrapper p-relative">
                  <div className="newsletter-thumb">
                    <Image
                      src={newsLetter}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="shape"
                    />
                  </div>
                  <div
                    className="newsletter-notice"
                    data-parallax='{"y": 50, "smoothness": 15}'
                  >
                    <div className="newsletter-notice-icon">
                      <span>
                        <BotIcon />
                      </span>
                    </div>
                    <div className="newsletter-notice-text">
                      <span>
                        Hi Alex! <br />
                        Welcome to Tourigo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                <div className="newsletter-content">
                  <div className="section-title-wrapper mb-30">
                    <h2 className="section-title small white-text mb-15">
                      Subscribe to our Newsletter!
                    </h2>
                  </div>
                  <div className="newsletter-form">
                    <form action="#">
                      <div className="newsletter-input">
                        <input type="text" placeholder="@ Enter email..." />
                        <button
                          type="submit"
                          className="bd-primary-btn btn-style has-arrow is-bg radius-8"
                        >
                          <span className="bd-primary-btn-arrow arrow-right">
                            <i className="fa-regular fa-arrow-right"></i>
                          </span>
                          <span className="bd-primary-btn-text">
                            Subscribe Now
                          </span>
                          <span className="bd-primary-btn-circle"></span>
                          <span className="bd-primary-btn-arrow arrow-left">
                            <i className="fa-regular fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaStyleEight;
