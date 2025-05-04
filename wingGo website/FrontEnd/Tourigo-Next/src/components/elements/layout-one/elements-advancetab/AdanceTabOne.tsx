import { faqElementStyle1 } from "@/data/faq-data";
import React from "react";

const AdanceTabOne = () => {
  return (
    <>
      <section className="faq__area section-space p-relative z-index-1 fix">
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
                      Tab With Accordion Style 01
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-3 col-xl-3 col-lg-3">
              <div
                className="faq-wrapper mb-35 wow bdFadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="faq-tab">
                  <nav>
                    <div
                      className="nav nav-tabs flex-column"
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-general-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-general"
                        type="button"
                        role="tab"
                        aria-controls="nav-general"
                        aria-selected="false"
                      >
                        <span>
                          <i className="icon-support"></i>
                        </span>
                        Questions 01
                      </button>
                      <button
                        className="nav-link"
                        id="nav-community-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community"
                        type="button"
                        role="tab"
                        aria-controls="nav-community"
                        aria-selected="false"
                      >
                        <span>
                          <i className="icon-envelope-b"></i>
                        </span>
                        Questions 02
                      </button>
                      <button
                        className="nav-link"
                        id="nav-support-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-support"
                        type="button"
                        role="tab"
                        aria-controls="nav-support"
                        aria-selected="true"
                      >
                        <span>
                          <i className="icon-share"></i>
                        </span>
                        Questions 03
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9">
              <div
                className="faq-tab-content tp-accordion wow bdFadeInUp"
                data-wow-delay=".6s"
                data-wow-duration="1s"
              >
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade active show"
                    id="nav-general"
                    role="tabpanel"
                    aria-labelledby="nav-general-tab"
                  >
                    <div className="accordion-wrapper faq-style-2">
                      <div className="accordion" id="accordionExampleFive">
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
                              data-bs-parent="#accordionExampleFive"
                            >
                              <div className="accordion-body">
                                {faq?.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-community"
                    role="tabpanel"
                    aria-labelledby="nav-community-tab"
                  >
                    <div className="accordion-wrapper faq-style-2">
                      <div className="accordion" id="accordionExampleSix">
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
                              data-bs-parent="#accordionExampleSix"
                            >
                              <div className="accordion-body">
                                {faq?.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="nav-support"
                    role="tabpanel"
                    aria-labelledby="nav-support-tab"
                  >
                    <div className="accordion-wrapper faq-style-2">
                      <div className="accordion" id="accordionExampleSeven">
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
                              data-bs-parent="#accordionExampleSeven"
                            >
                              <div className="accordion-body">
                                {faq?.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default AdanceTabOne;
