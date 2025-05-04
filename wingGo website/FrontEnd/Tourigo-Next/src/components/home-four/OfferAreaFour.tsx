"use client";
import Image from "next/image";
import React from "react";
import offerImgOne from "../../../public/assets/images/offer/offer-img-4.png";
import offerImgTwo from "../../../public/assets/images/offer/offer-img-5.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const OfferAreaFour = () => {
  return (
    <>
      <section className="bd-offer-area section-space" id="offer">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-6 col-xl-6 col-xl-6 col-lg-6 col-md-12 wow bdFadeInLeft">
              <div className="offer-wrapper offer-style-four theme-bg">
                <div className="offer-content-wrapper">
                  <div className="offer-content mb-25">
                    <h2 className="section-title white-text mb-10">
                      Special 30% off
                    </h2>
                    <h5 className="offer-subtitle color-warning mb-10">
                      Select Hotel Deals
                    </h5>
                    <p>
                      Share the core values and principles that drive your
                      company. Emphasize a commitment to custome.
                    </p>
                  </div>
                  <div className="offer-btn">
                    <Link
                      href="/contact"
                      className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
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
                </div>
                <div className="offer-image">
                  <Image
                    src={offerImgOne}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-xl-6 col-lg-6 col-md-12 wow bdFadeInRight">
              <div className="offer-wrapper offer-style-four warning-bg">
                <div className="offer-content-wrapper">
                  <div className="offer-content mb-25">
                    <h2 className="section-title white-text mb-10">
                      Get 20% off
                    </h2>
                    <span className="b4">Lets Explore the World</span>
                  </div>
                  <div className="offer-btn">
                    <Link
                      href="/contact"
                      className="bd-primary-btn btn-style has-arrow is-bg is-white radius-60"
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
                </div>
                <div className="offer-image">
                  <Image
                    src={offerImgTwo}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferAreaFour;
