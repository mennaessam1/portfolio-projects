"use client";
import Image from "next/image";
import React from "react";
import CtaThree from "../../../public/assets/images/cta/cta-bg-3.png";
import shapePlaneSeven from "../../../public/assets/images/shapes/plane-7.png";
import ShapeCtaWorld from "../../../public/assets/images/shapes/cta-world.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import LineDashIcon from "@/svg/LineDashIcon";

const CtaAreaFive = () => {
  return (
    <>
      <section className="bd-cta-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="cta-wrapper cta-item cta-top p-relative fix">
                <div className="cta-thumb">
                  <Image
                    src={CtaThree}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="image"
                  />
                </div>
                <div className="cta-five-shape-wrap">
                  <div className="cta-five-shape-one">
                    <LineDashIcon />
                  </div>
                  <div className="cta-five-shape-two">
                    <Image
                      src={shapePlaneSeven}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="cta-item-box">
                  <div className="cta-item-box-left">
                    <div className="">
                      <div className="cta-item-box-thumb spin">
                        <Image
                          src={ShapeCtaWorld}
                          loader={imageLoader}
                          style={{ width: "100%", height: "100%" }}
                          alt="shape"
                        />
                      </div>
                    </div>
                    <div className="section-title-wrapper p-relative z-index-11">
                      <span className="section-subtitle color-warning mb-10">
                        QUISEQUE VEL ORTOR
                      </span>
                      <h4 className="section-title white-text mb-5">
                        Ready to Enjoy Next Trip
                      </h4>
                    </div>
                  </div>
                  <div className="cta-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Explore Now</span>
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

export default CtaAreaFive;
