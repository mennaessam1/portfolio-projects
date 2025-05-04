"use client";
import Image from "next/image";
import React from "react";
import chooseImgTwo from "../../../../public/assets/images/choose/choose-img-2.png";
import chooseImgThree from "../../../../public/assets/images/choose/choose-img-3.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const WhyChoseElementThree = () => {
  return (
    <>
      <div className="row gy-24 align-items-center justify-content-between">
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12">
          <div className="section-title-wrapper section-title-space">
            <span className="section-subtitle mb-10">Why choose us</span>
            <h2 className="section-title mb-20">
              We are Discovering the Tour With Excitement
            </h2>
            <p>
              Share the core values and principles that drive your company.
              Emphasize a commitment to customer satisfaction, responsible
              tourism, or any unique approach you have towards.
            </p>
          </div>
          <div className="choose-list-box">
            <ul>
              <li className="underline wow bdFadeInUp" data-wow-delay=".3s">
                <span>
                  <i className="icon-world-map"></i>
                </span>
                <Link href="/about">Worldwide Tour Coverage</Link>
              </li>
              <li className="underline wow bdFadeInUp" data-wow-delay=".4s">
                <span>
                  <i className="icon-cleander-check"></i>
                </span>
                <Link href="/booking">First Booking</Link>
              </li>
              <li className="underline wow bdFadeInUp" data-wow-delay=".35s">
                <span>
                  <i className="icon-support"></i>
                </span>
                <Link href="/contact">Best Support</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12">
          <div className="choose-thumb-wrapper p-relative">
            <div
              className="choose-thumb-main wow bdFadeInLeft"
              data-wow-delay=".3s"
            >
              <div className="hover-effect">
                <Image
                  src={chooseImgThree}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </div>
            </div>
            <div
              className="choose-thumb-bordered wow bdFadeInRight"
              data-wow-delay=".3s"
            >
              <Image
                src={chooseImgTwo}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoseElementThree;
