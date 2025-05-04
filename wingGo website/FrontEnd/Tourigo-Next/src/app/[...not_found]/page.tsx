"use client";
import Image from "next/image";
import React from "react";
import bgErrorImg from "../../../public/assets/images/bg/404.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const ErrorPageArea = () => {
  return (
    <>
      <section className="bd-contact-form section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <div
                  className="error-thumb mb-20 wow bdFadeInUp"
                  data-wow-delay=".7s"
                >
                  <Image
                    src={bgErrorImg}
                    loader={imageLoader}
                    style={{ width: "", height: "100%" }}
                    alt="image"
                  />
                </div>
                <h2 className="section-title mb-20">
                  Oops! That page {`can't`} be found.
                </h2>
                <p>
                  {`We're`} really sorry but we {`can't`} seem to find the page
                  you were looking for.
                </p>
                <div className="error-btn">
                  <Link
                    href="/"
                    className="bd-primary-btn btn-style has-arrow radius-60"
                  >
                    <span className="bd-primary-btn-arrow arrow-right">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="bd-primary-btn-text">Go Back Home</span>
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
      </section>
    </>
  );
};

export default ErrorPageArea;
