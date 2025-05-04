import React from "react";
import bgImg from "../../../../../public/assets/images/offer/offer-img-1.png";
import bgImg2 from "../../../../../public/assets/images/offer/offer-img-2.png";
import Link from "next/link";
const OfferStyleTwo = () => {
  return (
    <>
      <section className="bd-offer-area section-space-bottom fix">
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
                      Offer Style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-right">
              <div
                className="offer-wrapper p-relative offer-thumb-bg image-bg"
                style={{ backgroundImage: `url(${bgImg.src})` }}
              >
                <div className="offer-content-wrap clip-path-left">
                  <div className="offer-content">
                    <div className="section-title-wrapper mb-30">
                      <span className="section-subtitle color-warning mb-15">
                        Get offer now
                      </span>
                      <h2 className="section-title x-small white-text mb-20">
                        Buy 1 Package,
                        <br />
                        Get 1 Free Now!
                      </h2>
                      <p>Share the core values and principles</p>
                    </div>
                    <div className="offer-btn">
                      <Link
                        href="/booking"
                        className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                      >
                        <span className="bd-primary-btn-arrow arrow-right">
                          <i className="fa-regular fa-arrow-right"></i>
                        </span>
                        <span className="bd-primary-btn-text">Book Now</span>
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
            <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-left">
              <div
                className="offer-wrapper p-relative offer-thumb-bg style-two image-bg"
                style={{ backgroundImage: `url(${bgImg2.src})` }}
              >
                <div className="offer-content-wrap clip-path-right">
                  <div className="offer-content">
                    <div className="section-title-wrapper mb-30">
                      <span className="section-subtitle color-warning mb-15">
                        Get offer now
                      </span>
                      <h2 className="section-title x-small white-text mb-20">
                        Ultimate Adventure <br /> Awaits!
                      </h2>
                      <p>Share the core values and principles</p>
                    </div>
                    <div className="offer-btn">
                      <Link
                        href="/booking"
                        className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                      >
                        <span className="bd-primary-btn-arrow arrow-right">
                          <i className="fa-regular fa-arrow-right"></i>
                        </span>
                        <span className="bd-primary-btn-text">Book Now</span>
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
        </div>
      </section>
    </>
  );
};

export default OfferStyleTwo;
