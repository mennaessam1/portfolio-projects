import Link from "next/link";
import React from "react";

const ButtonBorderRadius = () => {
  return (
    <>
      <section className="element-button section-space-bottom fix">
        <div className="container">
          <div className="row">
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
                        Border Radius Variation
                      </h2>
                    </div>
                    <div className="separator__line line-right"></div>
                  </div>
                  <p className="muted-text">
                    If you want to add different color button variations, add
                    the class name to your HTML. Below the button is the name of
                    the class.
                  </p>
                </div>
              </div>
            </div>
            <div className="row g-10 align-items-center justify-content-center">
              <div className="col-lg-3 text-center">
                <Link className="bd-btn btn-style radius-5" href="/home">
                  Button Border Radius
                </Link>
                <span className="d-block mt-5">.radius-5</span>
              </div>
              <div className="col-lg-3 text-center">
                <Link className="bd-btn btn-style radius-10" href="/home">
                  Button Border Radius
                </Link>
                <span className="d-block mt-5">.radius-10</span>
              </div>
              <div className="col-lg-3 text-center">
                <Link className="bd-btn btn-style radius-30" href="/home">
                  Button Border Radius
                </Link>
                <span className="d-block mt-5">.radius-30</span>
              </div>
              <div className="col-lg-3 text-center">
                <Link className="bd-btn btn-style radius-40" href="/home">
                  Button Border Radius
                </Link>
                <span className="d-block mt-5">.radius-40</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ButtonBorderRadius;
