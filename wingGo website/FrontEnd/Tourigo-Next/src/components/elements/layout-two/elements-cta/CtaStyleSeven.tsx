"use client";
import React from "react";
import ctaBG from "../../../../../public/assets/images/bg/cta-bg.png";
import appleStore from "../../../../../public/assets/images/app/apple-store.png";
import ctaThumb from "../../../../../public/assets/images/cta/cta-thumb.png";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";
const CtaStyleSeven = () => {
  return (
    <>
      <section className="cta__area section-space-bottom fix">
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
                      CTA Style 07
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="cta__wrapper cta-item-2 radius-20 section-rounded-100 theme-bg p-relative">
          <div
            className="cta-bg"
            style={{ backgroundImage: `url(${ctaBG.src})` }}
          ></div>
          <div className="cta-box">
            <div className="cta-thumb-wrapper d-flex justify-content-center justify-content-lg-center">
              <div className="cta-thumb">
                <Image
                  src={ctaThumb}
                  loader={imageLoader}
                  style={{ width: "auto", height: "auto" }}
                  alt="shape"
                />
              </div>
            </div>
            <div className="cta-content">
              <div className="section-title-wrapper mb-40">
                <span className="section-subtitle white-text mb-10">
                  AI Brainwave
                </span>
                <h2 className="section-title white-text mb-15">
                  Enhance Your Life with Artificial Intelligence
                </h2>
                {/* <p className="contentHidden">abc</p> */}
              </div>
              <div className="download-app">
                <div className="assets/images/app/apple-store.png">
                  <Link href="/home">
                    <Image src={appleStore} alt="image" />
                  </Link>
                </div>
                <div className="assets/images/app/apple-store.png">
                  <Link href="/home">
                    <Image src={appleStore} alt="image" />
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

export default CtaStyleSeven;
