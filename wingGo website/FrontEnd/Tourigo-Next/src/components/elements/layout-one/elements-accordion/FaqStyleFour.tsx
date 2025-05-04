import { faqElementStyle4 } from "@/data/faq-data";
import Link from "next/link";
import React from "react";

const FaqStyleFour = () => {
  return (
    <>
      <section className="faq__area section-space-bottom fix">
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
                      FAQ Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div
            className="row justify-content-center wow bdFadeInUp"
            data-wow-delay=".5s"
          >
            <div className="col-xxl-8 col-xl-8 col-lg-10">
              <div className="accordion-wrapper faq-style-4">
                <div className="accordion" id="accordionExampleFour">
                  {faqElementStyle4?.map((faq, index) => (
                    <div key={index} className="accordion-item">
                      <h2 className="accordion-header" id="headingSix">
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
                          <span>
                            <i className="icon-adventure"></i>
                          </span>{" "}
                          {faq?.question}
                        </button>
                      </h2>
                      <div
                        id={`collapse${faq.id}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${faq.id}`}
                        data-bs-parent="#accordionExampleFour"
                      >
                        <div className="accordion-body">
                          {faq?.answer}
                          <Link href="/faq" className="">
                            load more <i className="icon-arrow_forward"></i>
                          </Link>
                        </div>
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

export default FaqStyleFour;
