"use client";
import Image from "next/image";
import React from "react";
import brandImgOne from "../../../public/assets/images/brand/brand-img-1.png";
import brandImgTwo from "../../../public/assets/images/brand/brand-img-2.png";
import brandImgThree from "../../../public/assets/images/brand/brand-img-3.png";
import newsletterImg from "../../../public/assets/images/newsletter/newsletter-img-1.png";
import { imageLoader } from "@/hooks/image-loader";

const NewsletterArea = () => {
  return (
    <>
      <section className="bd-newsletter-area section-space fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between">
            <div className="col-xxl-6 col-lg-6">
              <div className="newsletter-wrapper ">
                <div className="section-title-wrapper mb-35">
                  <span className="section-subtitle mb-10">NewsLetter</span>
                  <h2 className="section-title mb-15">
                    Subscribe To Our Mailing List & Stay Up To Date
                  </h2>
                  <p className="">
                    Share the core values and principles that drive your company
                    Emphasize a commitment to customer satisfaction
                  </p>
                </div>
                <div className="newsletter-form mb-35">
                  <form action="#">
                    <div className="newsletter-input">
                      <input type="text" placeholder="Email Address" />
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
                <div className="brand-wrapper brand-style-one">
                  <div className="brand-thumb">
                    <Image
                      src={brandImgOne}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </div>
                  <div className="brand-thumb">
                    <Image
                      src={brandImgTwo}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </div>
                  <div className="brand-thumb">
                    <Image
                      src={brandImgThree}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-lg-6 wow bdFadeInRight">
              <div className="newsletter-thumb">
                <Image
                  src={newsletterImg}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterArea;
