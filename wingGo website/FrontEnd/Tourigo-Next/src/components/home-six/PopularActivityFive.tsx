"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ShapePlaneSix from "../../../public/assets/images/shapes/plane-6.png";
import ShapeCtaX from "../../../public/assets/images/shapes/cta-x.png";
import ShapeTriangle from "../../../public/assets/images/shapes/triangle.png";
import { imageLoader } from "@/hooks/image-loader";
import { popularActivityData } from "@/data/homeFive/popular-activity-data";
import CampIcon from "@/svg/CampIcon";

const PopularActivityFive = () => {
  return (
    <>
      <section className="bd-activity-area theme-bg-secondary section-space-top activity-space-bottom p-relative fix">
        <div className="container">
          <div className="activity-tab-shape">
            <div className="activity-tab-shape-one">
              <CampIcon />
            </div>
            <div className="activity-tab-shape-two">
              <Image
                src={ShapePlaneSix}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
            <div className="activity-tab-shape-three">
              <Image
                src={ShapeCtaX}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
            <div className="activity-tab-shape-four">
              <Image
                src={ShapeCtaX}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
            <div className="activity-tab-shape-five">
              <Image
                src={ShapeTriangle}
                loader={imageLoader}
                style={{ width: "100%", height: "100%" }}
                alt="shape"
              />
            </div>
          </div>
          <div className="row gy-24 text-center align-items-center justify-content-center section-title-space">
            <div className="col-xl-6">
              <div className="section-title-wrapper">
                <span className="section-subtitle color-warning mb-10">
                  Popular Activity
                </span>
                <h2 className="section-title white-text">
                  Nature is close adventure and very close to nature
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div
              className="col-xxl-4 col-xl-4 col-lg-4 wow bdFadeInLeft"
              data-wow-delay=".3s"
            >
              <div className="activity-tab">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  {popularActivityData.map((tab, index) => (
                    <li className="nav-item" role="presentation" key={tab.id}>
                      <button
                        className={`nav-link ${index === 0 ? "active" : ""}`}
                        id={`${tab.id}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#${tab.id}`}
                        type="button"
                        role="tab"
                        aria-controls={tab.id}
                        aria-selected={index === 0 ? "true" : "false"}
                      >
                        <span>
                          <i className={tab.icon}></i>
                        </span>
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="col-xxl-8 col-xl-8 col-lg-8 wow bdFadeInRight"
              data-wow-delay=".4s"
            >
              <div className="activity-tab-wrapper">
                <div
                  className="tab-content activity-tab-anim"
                  id="pills-tabContent"
                >
                  {popularActivityData.map((tab, index) => (
                    <div
                      className={`tab-pane fade ${
                        index === 0 ? "show active" : ""
                      }`}
                      id={tab.id}
                      role="tabpanel"
                      aria-labelledby={`${tab.id}-tab`}
                      tabIndex={0}
                      key={tab.id}
                    >
                      <div className="activity-tab-content-wrapper p-relative">
                        <div className="activity-tab-content-thumb">
                          <Image
                            src={tab.image}
                            loader={imageLoader}
                            style={{ width: "100%", height: "100%" }}
                            alt="image"
                          />
                        </div>
                        <div className="activity-tab-content">
                          <h5 className="activity-tab-title underline mb-10">
                            <Link href="/destinations-details-right">
                              {tab.linkTitle}
                            </Link>
                          </h5>
                          <p className="mb-25">{tab.description}</p>
                          <div className="client-meta">
                            <div className="client-thumb">
                              {tab.clients.map((client, idx) => (
                                <Link href="#" key={idx}>
                                  <Image
                                    src={client}
                                    loader={imageLoader}
                                    style={{ width: "100%", height: "100%" }}
                                    alt=""
                                  />
                                </Link>
                              ))}
                              <Link className="arrow" href="#">
                                <span>{tab.clientCount}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularActivityFive;
