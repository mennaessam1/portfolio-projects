"use client";
import React from "react";
import tripImg2 from "../../../../../public/assets/images/trip/trip-img-2.png";
import tripImg3 from "../../../../../public/assets/images/trip/trip-img-3.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const CardstyleThree = () => {
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
            <div className="col-lg-3 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg2}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href="/destinations-details-right">3 Tour</Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href="/destinations-details-right">Italy</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg3}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href="/destinations-details-right">2 Tour</Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href="/destinations-details-right">France</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg3}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href="/destinations-details-right">4 Tour</Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href="/destinations-details-right">Japan</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="trip-wrapper trip-style-one p-relative">
                <div className="trip-thumb image-overly">
                  <Link href="/destinations-details-right">
                    <Image
                      src={tripImg2}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="trip-tag">
                  <div className="trip-number">
                    <span>
                      <Link href="/destinations-details-right">4 Tour</Link>
                    </span>
                  </div>
                  <div className="trip-location">
                    <span>
                      <Link href="/destinations-details-right">Japan</Link>
                    </span>
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

export default CardstyleThree;
