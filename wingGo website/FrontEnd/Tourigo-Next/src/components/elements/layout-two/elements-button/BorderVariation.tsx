import Link from "next/link";
import React from "react";

const BorderVariation = () => {
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
                      Border Variation
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
          <div className="row g-10 align-items-center justify-content-center">
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-10 btn-xs"
                href="/home"
              >
                Button XS
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-20 btn-sm"
                href="/home"
              >
                Button SM
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-30 btn-md"
                href="/home"
              >
                Button MD
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-40 btn-lg"
                href="/home"
              >
                Button LG
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-50 btn-xl"
                href="/home"
              >
                Button XL
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style outline-btn radius-60 btn-xxl"
                href="/home"
              >
                Button XXL
              </Link>
              <span className="d-block mt-5">.outline-btn</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BorderVariation;
