"use client";
import React from "react";
import tripImg7 from "../../../../../public/assets/images/trip/trip-img-7.png";
import tripImg8 from "../../../../../public/assets/images/trip/trip-img-8.png";
import tripImg9 from "../../../../../public/assets/images/trip/trip-img-9.png";
import tripImg10 from "../../../../../public/assets/images/trip/trip-img-10.png";
import tripImg11 from "../../../../../public/assets/images/trip/trip-img-11.png";
import tripImg12 from "../../../../../public/assets/images/trip/trip-img-12.png";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";

const CardstyleTwo = () => {
  return (
    <>
      <div className="bd-element-area section-space">
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
                      Image Card style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg7}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg8}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg9}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg10}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg11}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="activity-wrapper activity-style-three">
                <div className="activity-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg12}
                      loader={imageLoader}
                      style={{ width: "auto", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="activity-content-wrap text-center">
                  <div className="activity-btn">
                    <Link
                      className="bd-icon-btn small"
                      href="/destinations-details-right"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="activity-content">
                    <h6 className="underline">
                      <Link href="/destinations-details-right">
                        Sintra, Portugal
                      </Link>
                    </h6>
                    <p>90+ Tours</p>
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

export default CardstyleTwo;
