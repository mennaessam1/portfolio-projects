import React from "react";

const CtaStyleFour = () => {
  return (
    <>
      <section className="cta__area section-space-bottom fix">
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
                      CTA Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="newsletter__wrapper newsletter-item section-space-medium theme-bg">
            <div className="newsletter-circle-1"></div>
            <div className="newsletter-circle-2"></div>
            <div
              className="contentHidden"
              data-background="contentHidden"
            ></div>
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-6 col-lg-10">
                <div className="newsletter-content-wrap">
                  <div className="newsletter-content">
                    <div className="section-title-wrapper text-center mb-45">
                      <span className="section-subtitle white-text mb-10">
                        newsletter
                      </span>
                      <h2 className="section-title small white-text mb-15">
                        Let’s Subscriber To Our Newsletter
                      </h2>
                    </div>
                  </div>
                  <div className="newsletter-form">
                    <form action="#">
                      <div className="newsletter-input">
                        <input type="text" placeholder="@ Enter email..." />
                        <button
                          type="submit"
                          className="bd-primary-btn btn-style has-arrow is-bg radius-8"
                        >
                          <span className="bd-primary-btn-arrow arrow-right">
                            <i className="fa-regular fa-arrow-right"></i>
                          </span>
                          <span className="bd-primary-btn-text">
                            Subscribe Now
                          </span>
                          <span className="bd-primary-btn-circle"></span>
                          <span className="bd-primary-btn-arrow arrow-left">
                            <i className="fa-regular fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="info-list-2">
                  <ul>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <p>No Credit Card Required</p>
                    </li>
                    <li>
                      <i className="fa-solid fa-check"></i>
                      <p>Cancel Any Time.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaStyleFour;
