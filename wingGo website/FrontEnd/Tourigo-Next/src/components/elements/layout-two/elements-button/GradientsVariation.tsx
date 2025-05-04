import Link from "next/link";
import React from "react";

const GradientsVariation = () => {
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
                      Gradients Variation
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
          <div className="row g-5 align-items-center justify-content-center">
            <div className="col-lg-3 text-center">
              <Link
                className="bd-gradient-btn btn-style radius-60"
                href="/home"
              >
                Know More
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.bd-gradient-btn</span>
            </div>
            <div className="col-lg-3 text-center">
              <Link
                className="bd-gradient-btn btn-style radius-60 btn-secondary"
                href="/home"
              >
                Know More
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-secondary</span>
            </div>
            <div className="col-lg-3 text-center">
              <Link
                className="bd-gradient-btn btn-style radius-60 btn-tertiary"
                href="/home"
              >
                Know More
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-tertiary</span>
            </div>
            <div className="col-lg-3 text-center">
              <Link
                className="bd-gradient-btn btn-style radius-60 btn-quaternary"
                href="/home"
              >
                Know More
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-quaternary</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GradientsVariation;
