import CountUpContent from "@/elements/counter/CountUpContent";
import Link from "next/link";
import React from "react";

const OfferStyleFour = () => {
  return (
    <>
      <div className="bd-offer-area section-title-space fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Offer Style 3
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bd-counter-area section-space p-relative half-bg">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-5 col-lg-7 col-md-7">
              <div className="section-title-wrapper">
                <span className="section-subtitle color-warning mb-10">
                  Offer
                </span>
                <h3 className="section-title white-text">
                  Grrab up to <span className="text-quaternary">35% off</span>{" "}
                  on your favorite Destination
                </h3>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-5">
              <div className="counter-btn-wrapper d-flex justify-content-md-end">
                <div className="counter-btn-content text-md-center">
                  <p className="white-text mb-20">
                    Limited time offer, don’t miss the opportunity
                  </p>
                  <div className="counter-btn">
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
          <div className="row">
            <div className="counter-wrapper counter-style-three">
              <div className="counter-item">
                <div className="counter-content">
                  <span className="counter-icon">
                    <i className="icon-location-crosshairs"></i>
                  </span>
                  <h2>
                    <span
                      data-purecounter-duration="1"
                      data-purecounter-end="1199"
                      className="purecounter"
                    >
                      <CountUpContent number={1999} text="+" />
                    </span>
                  </h2>
                  <p>Total Destination</p>
                </div>
              </div>

              <div className="counter-item">
                <div className="counter-content">
                  <span className="counter-icon">
                    <i className="icon-campaigns"></i>
                  </span>
                  <h2>
                    <span
                      data-purecounter-duration="1"
                      data-purecounter-end="3"
                      className="purecounter"
                    >
                      <CountUpContent number={3} text="K+" />
                    </span>
                  </h2>
                  <p>Campaigns Closed</p>
                </div>
              </div>

              <div className="counter-item">
                <div className="counter-content">
                  <span className="counter-icon">
                    <i className="icon-circle-user"></i>
                  </span>
                  <h2>
                    <span
                      data-purecounter-duration="1"
                      data-purecounter-end="89"
                      className="purecounter"
                    >
                      <CountUpContent number={89} text="+" />
                    </span>
                  </h2>
                  <p>Our Volunteer</p>
                </div>
              </div>

              <div className="counter-item">
                <div className="counter-content">
                  <span className="counter-icon">
                    <i className="icon-balloons"></i>
                  </span>
                  <h2>
                    <span
                      data-purecounter-duration="1"
                      data-purecounter-end="1"
                      className="purecounter"
                    >
                      <CountUpContent number={1} text="M+" />
                    </span>
                  </h2>
                  <p>Happy Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferStyleFour;
