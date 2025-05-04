"use client";
import React from "react";
import brand7 from "../../../../../public/assets/images/brand/brand-07.png";
import brand8 from "../../../../../public/assets/images/brand/brand-08.png";
import brand9 from "../../../../../public/assets/images/brand/brand-09.png";
import brand10 from "../../../../../public/assets/images/brand/brand-10.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
const BrandStyleFour = () => {
  return (
    <>
      <div className="element-brand-area section-space-bottom fix">
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
                      Brand Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="brand-item brand-style-three">
                <div className="brand-thumb">
                  <Image
                    src={brand7}
                    alt="image"
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="brand-item brand-style-three">
                <div className="brand-thumb">
                  <Image
                    src={brand8}
                    alt="image"
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="brand-item brand-style-three">
                <div className="brand-thumb">
                  <Image
                    src={brand9}
                    alt="image"
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="brand-item brand-style-three">
                <div className="brand-thumb">
                  <Image
                    src={brand10}
                    alt="image"
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
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

export default BrandStyleFour;
