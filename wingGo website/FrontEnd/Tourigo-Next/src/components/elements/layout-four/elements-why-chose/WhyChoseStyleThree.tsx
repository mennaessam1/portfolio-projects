"use client";
import React from "react";
import WhyChoseElementThree from "@/components/common/whyChoseElement/WhyChoseElementThree";
const WhyChoseStyleThree = () => {
  return (
    <>
      <div className="bd-why-chose-area section-space-bottom fix">
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
                      Why Chose Style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <WhyChoseElementThree />
        </div>
      </div>
    </>
  );
};

export default WhyChoseStyleThree;
