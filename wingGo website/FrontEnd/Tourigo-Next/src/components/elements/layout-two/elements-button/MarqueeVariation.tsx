import Link from "next/link";
import React from "react";

const MarqueeVariation = () => {
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
                      Marquee Variation
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
            <div className="col-lg-3 text-center">
              <Link className="bd-marquee-btn btn-style radius-60" href="#">
                <span data-text="Marquee X">Marquee X</span>
              </Link>
            </div>
            <div className="col-lg-3 text-center">
              <Link
                className="bd-marquee-btn btn-style marquee-text-y radius-60"
                href="#"
              >
                <span data-text="Marquee Y">Marquee Y</span>
              </Link>
            </div>
            <div className="col-lg-3 text-center">
              <Link
                className="bd-marquee-btn btn-style marquee-text-auto radius-60"
                href="#"
              >
                <span data-text="Marquee X">Marquee X</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarqueeVariation;
