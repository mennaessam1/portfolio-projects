"use client";
import React from "react";
import pricingImg1 from "../../../../../public/assets/images/priceing/pricing-img-1.png";
import pricingImg2 from "../../../../../public/assets/images/priceing/pricing-img-2.png";
import pricingImg3 from "../../../../../public/assets/images/priceing/pricing-img-3.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const PricingStyleOne = () => {
  return (
    <>
      <div className="bd-cta-area section-space fix">
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
                      Pricing Plane Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <div className="pricing-wrapper pricing-style">
                <div className="pricing-thumb-wrapper position-relative">
                  <div className="pricing-thumb">
                    <Image
                      src={pricingImg1}
                      alt="image"
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <span className="pricing-tag">Basic Plan</span>
                  <h3 className="pricing-package-price white-text">$ 149.99</h3>
                </div>
                <div className="pricing-content">
                  <div className="pricing-content-list">
                    <ul>
                      <li>1 Person</li>
                      <li>3 Night 4 days</li>
                      <li>Dinner Included</li>
                      <li>2 Travel Spots</li>
                      <li>Lunch Included</li>
                    </ul>
                  </div>
                  <div className="pricing-btn">
                    <Link
                      className="bd-btn btn-style radius-60 w-100"
                      href="/booking"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <div className="pricing-wrapper pricing-style active-pricing">
                <div className="pricing-thumb-wrapper position-relative">
                  <div className="pricing-thumb">
                    <Image
                      src={pricingImg2}
                      alt="image"
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <span className="pricing-tag">Standard Plan</span>
                  <h3 className="pricing-package-price white-text">$ 199.99</h3>
                </div>
                <div className="pricing-content">
                  <div className="pricing-content-list">
                    <ul>
                      <li>5 People</li>
                      <li>4 Night 5 days</li>
                      <li>Dinner Included</li>
                      <li>3 Travel Spots</li>
                      <li>Lunch Included</li>
                    </ul>
                  </div>
                  <div className="pricing-btn">
                    <Link
                      className="bd-btn btn-style radius-60 w-100"
                      href="/booking"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <div className="pricing-wrapper pricing-style">
                <div className="pricing-thumb-wrapper position-relative">
                  <div className="pricing-thumb">
                    <Image
                      src={pricingImg3}
                      alt="image"
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <span className="pricing-tag">Premium Plan</span>
                  <h3 className="pricing-package-price white-text">$ 599.99</h3>
                </div>
                <div className="pricing-content">
                  <div className="pricing-content-list">
                    <ul>
                      <li>5 People</li>
                      <li>6 Night 7 days</li>
                      <li>Dinner Included</li>
                      <li>5 Travel Spots</li>
                      <li>Lunch Included</li>
                    </ul>
                  </div>
                  <div className="pricing-btn">
                    <Link
                      className="bd-btn btn-style radius-60 w-100"
                      href="/booking"
                    >
                      Book Now
                    </Link>
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

export default PricingStyleOne;
