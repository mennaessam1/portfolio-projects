import Link from "next/link";
import React from "react";

const PricingStyleTwo = () => {
  return (
    <>
      <div className="bd-pricing-area section-space-bottom">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Pricing Plane Style 02
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row g-5 wow bdFadeInUp" data-wow-delay=".3s">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-wrapper pricing-item">
                <div className="pricing-content">
                  <h5 className=" pricing-title">Basic</h5>
                  <p className="pricing-description">
                    An introductory section that provides an overview of the
                    document
                  </p>
                  <h2 className="pricing-amount">
                    <span className="dollar-sign color-primary">$</span>
                    200
                    <span className="duration">/monthly</span>
                  </h2>
                </div>
                <div className="pricing-btn">
                  <Link
                    className="bd-btn btn-style radius-60 w-100"
                    href="/booking"
                  >
                    Book Now
                  </Link>
                </div>
                <div className="pricing-feature">
                  <ul className="pricing-list">
                    <li>
                      <i className="fa-regular fa-check"></i>1 Person
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>3 Night 4 days
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Dinner Included
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>2 Travel Spots
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Lunch Included
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-wrapper pricing-item active">
                <div className="pricing-content">
                  <h5 className=" pricing-title">Premium</h5>
                  <p className="pricing-description">
                    An introductory section that provides an overview of the
                    document
                  </p>
                  <h2 className="pricing-amount">
                    <span className="dollar-sign color-primary">$</span>
                    400
                    <span className="duration">/monthly</span>
                  </h2>
                </div>
                <div className="pricing-btn">
                  <Link
                    className="bd-btn btn-style radius-60 w-100"
                    href="/booking"
                  >
                    Book Now
                  </Link>
                </div>
                <div className="pricing-feature">
                  <ul className="pricing-list">
                    <li>
                      <i className="fa-regular fa-check"></i>5 Person
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>5 Night 6 days
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Dinner Included
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>4 Travel Spots
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Lunch Included
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="pricing-wrapper pricing-item">
                <div className="pricing-content">
                  <h5 className=" pricing-title">Enterprise</h5>
                  <p className="pricing-description">
                    An introductory section that provides an overview of the
                    document
                  </p>
                  <h2 className="pricing-amount">
                    <span className="dollar-sign color-primary">$</span>
                    600
                    <span className="duration">/monthly</span>
                  </h2>
                </div>
                <div className="pricing-btn">
                  <Link
                    className="bd-btn btn-style radius-60 w-100"
                    href="/booking"
                  >
                    Book Now
                  </Link>
                </div>
                <div className="pricing-feature">
                  <ul className="pricing-list">
                    <li>
                      <i className="fa-regular fa-check"></i>
                      15 Person
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>6 Night 7 days
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Dinner Included
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>5 Travel Spots
                    </li>
                    <li>
                      <i className="fa-regular fa-check"></i>
                      Lunch Included
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingStyleTwo;
