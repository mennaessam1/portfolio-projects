"use client";
import Image from "next/image";
import React from "react";
import shapeStar from "../../../../public/assets/images/shapes/cta-star.png";
import shapeEye from "../../../../public/assets/images/shapes/cta-eye.png";
import shapeX from "../../../../public/assets/images/shapes/cta-x.png";
import ctaImgTwo from "../../../../public/assets/images/cta/cta-img-2.png";
import ctaBgTwo from "../../../../public/assets/images/cta/cta-img-2-bg.png";
import { imageLoader } from "@/hooks/image-loader";

const CtaElementTwo = () => {
  return (
    <>
      <section className="bd-cta-section theme-bg fix p-relative">
        <div
          className="cta-shape-bg"
          style={{ backgroundImage: `url(${ctaBgTwo.src})` }}
          data-background="assets/images/cta/cta-Image-2-bg.png"
        ></div>
        <div className="container">
          <div className="cta-three-shape">
            <div className="cta-three-shape-one p-absolute">
              <Image
                src={shapeStar}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-two p-absolute">
              <Image
                src={shapeEye}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-three p-absolute">
              <Image
                src={shapeX}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-four p-absolute">
              <Image
                src={shapeStar}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-six p-absolute">
              <Image
                src={shapeX}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-4 order-lg-0 order-1 wow bdFadeInLeft">
              <div className="cta-thumb-wrap cta-style-two p-relative">
                <div className="cta-thumb-two">
                  <Image
                    src={ctaImgTwo}
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 order-lg-1 order-0">
              <div className="cta-wrapper cta-style-two">
                <div className="section-title-wrapper mb-35">
                  <h2 className="section-title small white-text mb-15">
                    Subscribe To Our Mailing List & Stay Up To Date
                  </h2>
                  <p className="white-text">
                    Share the core values and principles that drive your company
                    Emphasize a commitment to customer satisfaction
                  </p>
                  <div className="cta-form">
                    <form action="#">
                      <div className="cta-input white-button">
                        <input type="text" placeholder="Your email address" />
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

export default CtaElementTwo;
