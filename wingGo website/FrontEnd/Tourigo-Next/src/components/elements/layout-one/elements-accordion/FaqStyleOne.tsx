import { faqElementStyle1 } from "@/data/faq-data";
import React from "react";

const FaqStyleOne = () => {
  return (
    <>
      <section className="faq__area section-space fix">
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
                      FAQ Style
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-xxl-8 col-xl-8 col-lg-10">
              <div className="accordion-wrapper faq-style-3">
                <div className="accordion" id="accordionExampleThree">
                  {faqElementStyle1?.map((faq, index) => (
                    <div key={index} className="accordion-item">
                      <h6 className="accordion-header" id={faq?.id}>
                        <button
                          className={`accordion-button ${
                            index !== 0 ? "collapsed" : ""
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${faq.id}`}
                          aria-expanded={index === 0}
                          aria-controls={`collapse${faq.id}`}
                        >
                          <span>Q.</span> {faq?.question}
                        </button>
                      </h6>
                      <div
                        id={`collapse${faq.id}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={faq.id}
                        data-bs-parent="#accordionExampleThree"
                      >
                        <div className="accordion-body">{faq?.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqStyleOne;
