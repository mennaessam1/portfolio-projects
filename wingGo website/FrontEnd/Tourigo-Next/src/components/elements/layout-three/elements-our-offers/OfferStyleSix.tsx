"use client";
import React from "react";
import tripImg from "../../../../../public/assets/images/trip/trip-img-15.png";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";
const OfferStyleSix = () => {
  return (
    <>
      <section className="bd-offer-area section-space-bottom fix">
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
                      Offer Style 5
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-4">
              <div className="offer-wrapper offer-style-five mt-24">
                <div className="offer-thumb">
                  <Image
                    src={tripImg}
                    alt="image"
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="offer-content">
                  <p className="title-font mb-20">Enjoy Up to Half Off!</p>
                  <h4 className="white-text offer-mb">
                    Members Saving up to 50%
                  </h4>
                  <div className="offer-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Book Now</span>
                      <span className="bd-primary-btn-circle"></span>
                      <span className="bd-primary-btn-arrow arrow-left">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
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

export default OfferStyleSix;
