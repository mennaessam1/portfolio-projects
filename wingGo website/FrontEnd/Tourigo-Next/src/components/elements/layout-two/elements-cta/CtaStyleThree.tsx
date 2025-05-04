import React from "react";
import ctaBgImg2 from "../../../../../public/assets/images/cta/cta-bg-2.png";
import Image from "next/image";
import Link from "next/link";
const CtaStyleThree = () => {
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
                      CTA Style 03
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="cta__wrapper cta-item p-relative">
                <div className="cta-thumb">
                  <Image src={ctaBgImg2} alt="shape" />
                </div>
                <div className="cta-item-box">
                  <div className="section-title-wrapper p-relative z-index-11">
                    <span className="section-subtitle white-text mb-10">
                      call us now
                    </span>
                    <h2 className="section-title white-text mb-20">
                      Request a consultation!
                    </h2>
                    <p className="white-text mb-0 max-500">
                      Available 24/7 on weekdays to answer your inquiries,
                      provide assistance
                    </p>
                  </div>
                  <div className="cta-content text-center p-relative z-index-11">
                    <div className="cta-icon margin-auto icon-btn bg-tertiary pulse-white">
                      <i className="icon-call-ring"></i>
                    </div>
                    <Link href="tel:+1(967)019242590">+1(967) 0192 425 90</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CtaStyleThree;
