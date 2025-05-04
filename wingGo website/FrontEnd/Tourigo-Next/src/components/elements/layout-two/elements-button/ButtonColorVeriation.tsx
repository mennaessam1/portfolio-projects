import Link from "next/link";
import React from "react";

const ButtonColorVeriation = () => {
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
                      Buttons Color Variation
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
              <Link className="bd-btn btn-style radius-60" href="/home">
                Primary Button
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.bd-btn btn-style</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style radius-60 btn-secondary"
                href="/home"
              >
                Secondary btn
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-secondary</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style radius-60 btn-tertiary"
                href="/home"
              >
                Tertiary btn
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-tertiary</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style radius-60 btn-quaternary"
                href="/home"
              >
                Warning btn
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.btn-quaternary</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style radius-60 bd-success"
                href="/home"
              >
                Success btn
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.bd-success</span>
            </div>
            <div className="col-lg-2 text-center">
              <Link
                className="bd-btn btn-style radius-60 bd-danger"
                href="/home"
              >
                Danger btn
                <span>
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </Link>
              <span className="d-block mt-5">.bd-danger</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ButtonColorVeriation;
