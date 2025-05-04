import Link from "next/link";
import React from "react";

const ModernVeriation = () => {
  return (
    <>
      <section className="element-button section-space-bottom fix">
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
                      Modern Variation
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text">
                  If you want to add different color button variations, add the
                  class name to your HTML. Below the button is the name of the
                  class.
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-2 text-center">
              <Link className="bd-modern-btn" href="#">
                <span className="bd-modern-btn-text">Modern Button</span>
                <i className="fa-regular fa-arrow-right-long"></i>
              </Link>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="#" className="bd-swipe-btn">
                Get Started{" "}
                <span className="bd-swipe-btn-icon">
                  <i className="fa-regular fa-arrow-right-long"></i>
                </span>{" "}
              </Link>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="#" className="bd-animated-btn radius-60">
                <svg
                  viewBox="0 0 24 24"
                  className="arrow-right"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="bd-animated-btn-text">Modern Button</span>
                <span className="bd-animated-btn-circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arrow-left"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </Link>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="#" className="bd-animated-btn style-two">
                <svg
                  viewBox="0 0 24 24"
                  className="arrow-right"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="bd-animated-btn-text">Modern Button</span>
                <span className="bd-animated-btn-circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arrow-left"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModernVeriation;
