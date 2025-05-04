import React from "react";
import offerImg4 from "../../../../../public/assets/images/offer/offer-img-4.png";
import offerImg5 from "../../../../../public/assets/images/offer/offer-img-5.png";
import Image from "next/image";
import Link from "next/link";
const OfferStyleFive = () => {
  return (
    <>
      <section className="bd-offer-area section-space-bottom fix">
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
                      Offer Style 4
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div
              className="col-xxl-6 col-xl-6 col-xl-6 col-lg-6 col-md-12"
              data-aos="fade-right"
            >
              <div className="offer-wrapper offer-style-four theme-bg">
                <div className="offer-content-wrapper">
                  <div className="offer-content mb-25">
                    <h2 className="section-title white-text mb-10">
                      Special 30% off
                    </h2>
                    <h5 className="offer-subtitle color-warning mb-10">
                      Select Hotel Deals
                    </h5>
                    <p>
                      Share the core values and principles that drive your
                      company. Emphasize a commitment to custome.
                    </p>
                  </div>
                  <div className="offer-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Know More</span>
                      <span className="bd-primary-btn-circle"></span>
                      <span className="bd-primary-btn-arrow arrow-left">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="offer-image">
                  <Image src={offerImg4} alt="image" />
                </div>
              </div>
            </div>
            <div
              className="col-xxl-6 col-xl-6 col-xl-6 col-lg-6 col-md-12"
              data-aos="fade-left"
            >
              <div className="offer-wrapper offer-style-four warning-bg">
                <div className="offer-content-wrapper">
                  <div className="offer-content mb-25">
                    <h2 className="section-title white-text mb-10">
                      Get 20% off
                    </h2>
                    <span className="b4">Lets Explore the World</span>
                  </div>
                  <div className="offer-btn">
                    <Link
                      href="/booking"
                      className="bd-primary-btn btn-style has-arrow is-bg is-white radius-60"
                    >
                      <span className="bd-primary-btn-arrow arrow-right">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                      <span className="bd-primary-btn-text">Know More</span>
                      <span className="bd-primary-btn-circle"></span>
                      <span className="bd-primary-btn-arrow arrow-left">
                        <i className="fa-regular fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="offer-image">
                  <Image src={offerImg5} alt="image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferStyleFive;
