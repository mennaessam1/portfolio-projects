import Link from "next/link";
import React from "react";

const HoverVariation = () => {
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
                      Hover Variation
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
              <Link href="buttonLink" className="bd-switch-btn">
                <div className="bd-switch-default">
                  <span>Primary Text</span>
                </div>
                <div className="bd-switch-hover">
                  <span>SecondaryText</span>
                </div>
              </Link>
              <span className="d-block mt-5">bd-switch-btn</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="buttonLink" className="bd-switch-btn has-top">
                <div className="bd-switch-default">
                  <span>Primary Text</span>
                </div>
                <div className="bd-switch-hover">
                  <span>SecondaryText</span>
                </div>
              </Link>
              <span className="d-block mt-5">has-top</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="buttonLink" className="bd-switch-btn has-left">
                <div className="bd-switch-default">
                  <span>Primary Text</span>
                </div>
                <div className="bd-switch-hover">
                  <span>SecondaryText</span>
                </div>
              </Link>
              <span className="d-block mt-5">has-left</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link href="buttonLink" className="bd-switch-btn has-right">
                <div className="bd-switch-default">
                  <span>Primary Text</span>
                </div>
                <div className="bd-switch-hover">
                  <span>SecondaryText</span>
                </div>
              </Link>
              <span className="d-block mt-5">has-right</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HoverVariation;
