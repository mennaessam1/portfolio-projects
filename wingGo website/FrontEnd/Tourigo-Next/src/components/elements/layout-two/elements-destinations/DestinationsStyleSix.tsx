"use client";
import React from "react";
import activityImg1 from "../../../../../public/assets/images/activity/activity-img-1.png";
import activityImg2 from "../../../../../public/assets/images/activity/activity-img-2.png";
import activityImg4 from "../../../../../public/assets/images/activity/activity-img-4.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const DestinationsStyleSix = () => {
  return (
    <>
      <section className="element-Destinations-area section-space-bottom">
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
                      Destinations Style 06
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style activity-style-six">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={activityImg1}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-meta">
                  <span>
                    <i className="icon-star"></i> 5.0
                  </span>
                </div>
                <div className="activity-content-wrap">
                  <div className="activity-content">
                    <div className="activity-content-top d-flex align-items-center gap-10 justify-content-between">
                      <div className="activity-title-wrap">
                        <h6 className="underline">
                          <Link href="/destinations-details-right">
                            Guided City Tours Night Light
                          </Link>
                        </h6>
                      </div>
                      <div className="activity-btn">
                        <Link
                          className="bd-icon-btn hover-style"
                          href="/destinations-details-right"
                          target="_blank"
                        >
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style activity-style-six">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={activityImg4}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-meta">
                  <span>
                    <i className="icon-star"></i> 5.0
                  </span>
                </div>
                <div className="activity-content-wrap">
                  <div className="activity-content">
                    <div className="activity-content-top d-flex align-items-center gap-10 justify-content-between">
                      <div className="activity-title-wrap">
                        <h6 className="underline">
                          <Link href="/destinations-details-right">
                            Engaging in thrilling activities
                          </Link>
                        </h6>
                      </div>
                      <div className="activity-btn">
                        <Link
                          className="bd-icon-btn hover-style"
                          href="/destinations-details-right"
                          target="_blank"
                        >
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style activity-style-six">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={activityImg2}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-meta">
                  <span>
                    <i className="icon-star"></i> 5.0
                  </span>
                </div>
                <div className="activity-content-wrap">
                  <div className="activity-content">
                    <div className="activity-content-top d-flex align-items-center gap-10 justify-content-between">
                      <div className="activity-title-wrap">
                        <h6 className="underline">
                          <Link href="/destinations-details-right">
                            Tent camping services
                          </Link>
                        </h6>
                      </div>
                      <div className="activity-btn">
                        <Link
                          className="bd-icon-btn hover-style"
                          href="/destinations-details-right"
                          target="_blank"
                        >
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="activity-wrapper activity-style activity-style-six">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={activityImg4}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-meta">
                  <span>
                    <i className="icon-star"></i> 5.0
                  </span>
                </div>
                <div className="activity-content-wrap">
                  <div className="activity-content">
                    <div className="activity-content-top d-flex align-items-center gap-10 justify-content-between">
                      <div className="activity-title-wrap">
                        <h6 className="underline">
                          <Link href="/destinations-details-right">
                            Boat Cruises Segway Tourism
                          </Link>
                        </h6>
                      </div>
                      <div className="activity-btn">
                        <Link
                          className="bd-icon-btn hover-style"
                          href="/destinations-details-right"
                          target="_blank"
                        >
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
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

export default DestinationsStyleSix;
