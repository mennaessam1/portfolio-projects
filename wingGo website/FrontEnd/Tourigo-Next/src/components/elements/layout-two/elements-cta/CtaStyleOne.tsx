import React from "react";
import CtaElementOne from "@/components/common/ctaElements/CtaElementOne";
const CtaStyleOne = () => {
  return (
    <>
      <section className="bd-cta-area section-space fix">
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
                      CTA Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
        <CtaElementOne />
      </section>
    </>
  );
};

export default CtaStyleOne;
