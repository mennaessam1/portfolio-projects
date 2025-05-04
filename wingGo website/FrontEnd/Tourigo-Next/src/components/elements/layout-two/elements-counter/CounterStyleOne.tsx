import CountUpContent from "@/elements/counter/CountUpContent";
import React from "react";

const CounterStyleOne = () => {
  return (
    <>
      <section className="bd-counter-area section-space fix">
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
                      Counter Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 text-center justify-content-between">
            <div className="col-lg-3 col-sm-6">
              <div className="counter-wrapper counter-style-one p-relative">
                <div className="counter-content-wrapper">
                  <div className="counter-text">
                    <h3 className="counter-text-title">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="855"
                        className="purecounter"
                      >
                        <CountUpContent number={855} text="+" />
                      </span>
                    </h3>
                    <p>Total Destination</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-wrapper counter-style-one p-relative">
                <div className="counter-content-wrapper">
                  <div className="counter-text">
                    <h3 className="counter-text-title">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="900"
                        className="purecounter"
                      >
                        <CountUpContent number={900} text="+" />
                      </span>
                    </h3>
                    <p>Campaigns Closed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-wrapper counter-style-one p-relative">
                <div className="counter-content-wrapper">
                  <div className="counter-text">
                    <h3 className="counter-text-title">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="99"
                        className="purecounter"
                      >
                        <CountUpContent number={99} text="+" />
                      </span>
                    </h3>
                    <p>Our Volunteer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter-wrapper counter-style-one p-relative">
                <div className="counter-content-wrapper">
                  <div className="counter-text">
                    <h3 className="counter-text-title">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="15"
                        className="purecounter"
                      >
                        <CountUpContent number={15} text="M+" />
                      </span>
                    </h3>
                    <p>Happy Traveler</p>
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

export default CounterStyleOne;
