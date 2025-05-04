import Image from "next/image";
import React from "react";
import AboutImgSeven from "../../../public/assets/images/about/about-img-7.png";
import AboutImgEight from "../../../public/assets/images/about/about-img-8.png";
import Link from "next/link";

const AboutCompany = () => {
  return (
    <>
      <section className="bd-about-area flash-white section-space fix">
        <div className="container">
          <div className="row gy-24 justify-content-between">
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 wow bdFadeInLeft">
              <div className="about-content-wrapper">
                <div className="section-title-wrapper mb-35">
                  <span className="section-subtitle mb-15">
                    About Our Company
                  </span>
                  <h2 className="section-title mb-20">
                    Mapping Adventures, Making Moments
                  </h2>
                  <p>
                    Share the core values and principles that drive your
                    company. Emphasize a commitment to customer satisfaction,
                    responsible tourism, or any unique approach you have towards
                    travel.
                  </p>
                </div>
                <div className="about-feature-list">
                  <ul>
                    <li>
                      <span className="list-icon">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <p>
                        Discuss your commitment to excellent customer service.
                      </p>
                    </li>
                    <li>
                      <span className="list-icon">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <p>Share the core values that guide your business.</p>
                    </li>
                    <li>
                      <span className="list-icon">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <p>
                        Mention any partnerships with hotels, airlines, or local
                        guides
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="about-btn-wrap">
                  <div className="about-btn">
                    <Link
                      href="/contact"
                      className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Know More</span>
                      <span className="bd-primary-btn-circle"></span>
                      <span className="bd-primary-btn-arrow arrow-left">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                  <div className="about-call">
                    <span>
                      <i className="icon-support"></i>
                    </span>
                    <Link className="fw-5" href="tel:18004536744">
                      1-800-453-6744
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12">
              <div className="about-thumb-wrapper about-style-three ">
                <div className="about-thumb-seven wow img-custom-anim-left">
                  <Image src={AboutImgSeven} alt="image" />
                </div>
                <div className="about-thumb-eight wow img-custom-anim-right">
                  <Image src={AboutImgEight} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCompany;
