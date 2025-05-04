import Link from "next/link";
import React from "react";

const SocialStyleThree = () => {
  return (
    <>
      <section className="bd-social-area section-space-bottom fix">
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
                      Social Style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <div className="theme-social has-big justify-content-center">
                <Link href="https://www.facebook.com/">
                  <i className="icon-facebook"></i>
                </Link>
                <Link href="https://www.twitter.com/">
                  <i className="icon-twitter-x"></i>
                </Link>
                <Link href="https://www.linkedin.com/">
                  <i className="icon-linkedin"></i>
                </Link>
                <Link href="https://www.youtube.com/">
                  <i className="icon-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialStyleThree;
