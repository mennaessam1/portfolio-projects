"use client";
import Image from "next/image";
import React from "react";
import CtaShapeOne from "../../../../public/assets/images/shapes/cta-star.png";
import CtaShapeTwo from "../../../../public/assets/images/shapes/cta-x.png";
import CtaShapeThree from "../../../../public/assets/images/shapes/cta-star.png";
import CtaShapeFour from "../../../../public/assets/images/shapes/cta-eye.png";
import CtaShapeFive from "../../../../public/assets/images/shapes/cta-x.png";
import CtaShapeBadge from "../../../../public/assets/images/shapes/badge-2.png";
import CtaOne from "../../../../public/assets/images/cta/cta-img-1.png";
import { imageLoader } from "@/hooks/image-loader";

const CtaElementOne = () => {
  return (
    <>
      <section className="bd-cta-area cta-bg fix">
        <div className="container">
          <div className="cta-three-shape">
            <div className="cta-three-shape-one p-absolute">
              <Image
                src={CtaShapeOne}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-three p-absolute">
              <Image
                src={CtaShapeTwo}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-four p-absolute">
              <Image
                src={CtaShapeThree}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-five p-absolute">
              <Image
                src={CtaShapeFour}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
            <div className="cta-three-shape-six p-absolute">
              <Image
                src={CtaShapeFive}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="shape"
              />
            </div>
          </div>
          <div className="row gy-24 align-content-end justify-content-between">
            <div className="col-xl-5 col-lg-6">
              <div className="cta-wrapper style-one">
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
                      <div className="cta-input">
                        <input type="text" placeholder="Your email" />
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
            <div className="col-xl-6 col-lg-6">
              <div className="cta-thumb-bg p-relative">
                <div className="cta-badge">
                  <Image
                    src={CtaShapeBadge}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="badge"
                  />
                  <div className="cta-badge-text">
                    <h3 className="cta-badge-title">
                      50%
                      <br />
                      Off
                    </h3>
                  </div>
                </div>
                <div className="cta-thumb">
                  <Image
                    src={CtaOne}
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
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

export default CtaElementOne;
