import Link from "next/link";
import React from "react";

const FooterArea = () => {
  return (
    <>
      <footer className="bd-footer-area theme-bg-secondary fix">
        <div className="section-space">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-5 col-xl-5 col-lg-6">
                <div className="footer-inner text-center">
                  <div className="demo-footer-text">
                    <h2 className="mb-15 white-text">
                      Start Build Your Website With Tourigo
                    </h2>
                  </div>
                  <p className="footer-demo-description">
                    Purchase Tourigo today and start to creating your beautiful
                    tour and travel website.
                  </p>
                  <div className="">
                    <Link
                      href="https://themeforest.net/item/tourigo-tour-travel-html5-template/51357906?s_rank=1"
                      className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Purchase Now</span>
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
        <div className="footer-copyright-area border-two">
          <div className="container">
            <div className="row gy-24 align-items-center justify-content-center">
              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                <div className="footer-copyright has-white underline-two text-center">
                  <p>
                    Copyright @ 2024{" "}
                    <Link
                      href="https://themeforest.net/user/bdevs"
                      target="_blank"
                    >
                      Tourigo
                    </Link>{" "}
                    . All Right Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterArea;
