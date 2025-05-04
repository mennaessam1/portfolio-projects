import Link from "next/link";
import React from "react";

const SocialStyleFour = () => {
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
            <div className="col-lg-5 col-sm-6">
              <div className="social-menu d-flex justify-content-center text-center">
                <ul>
                  <li>
                    <Link
                      className="facebook"
                      href="https://facebook.com/"
                      target="blank"
                    >
                      <i className="icon-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="twitter"
                      href="https://twitter.com/"
                      target="blank"
                    >
                      <i className="icon-twitter-x"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="instagram"
                      href="https://www.instagram.com"
                      target="blank"
                    >
                      <i className="icon-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="linkedin"
                      href="https://www.linkedin.com"
                      target="blank"
                    >
                      <i className="icon-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link className="youtube" href="https://youtube.com/">
                      <i className="icon-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialStyleFour;
