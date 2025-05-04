"use client";
import React from "react";
import brand1 from "../../../../../public/assets/images/brand/brand-img-1.png";
import brand2 from "../../../../../public/assets/images/brand/brand-img-2.png";
import brand3 from "../../../../../public/assets/images/brand/brand-img-3.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
const BrandStyleOne = () => {
  return (
    <>
      <div className="element-brand-area section-space fix">
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
                      Brand Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 row-cols-1 row-cols-md-4 row-cols-lg-4">
            <div className="brand-item text-center">
              <div className="brand-thumb">
                <Image
                  src={brand1}
                  alt="img"
                  loader={imageLoader}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            </div>
            <div className="brand-item text-center">
              <div className="brand-thumb">
                <Image
                  src={brand2}
                  alt="img"
                  loader={imageLoader}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            </div>
            <div className="brand-item text-center">
              <div className="brand-thumb">
                <Image
                  src={brand3}
                  alt="img"
                  loader={imageLoader}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            </div>
            <div className="brand-item text-center">
              <div className="brand-thumb">
                <Image
                  src={brand1}
                  alt="img"
                  loader={imageLoader}
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandStyleOne;
