import { faqElementStyle2 } from "@/data/faq-data";
import React from "react";

const AdanceTabTwo = () => {
  return (
    <>
      <section className="faq__area section-space-bottom faq__style-6 p-relative z-index-1 fix">
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
                      Tab With Accordion Style 02
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
                className="accordion-wrapper mb-35 wow bdFadeInUp"
                data-wow-delay=".3s"
                data-wow-duration="1s"
              >
                <div className="faq-tab accordion-wrapper faq-style-2">
                  <nav>
                    <div
                      className="nav nav-tabs flex-column"
                      id="nav-tab-2"
                      role="tablist"
                    >
                      <button
                        className="nav-link"
                        id="nav-general-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-general-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-general-2"
                        aria-selected="false"
                      >
                        <span>
                          <i className="icon-support"></i>
                        </span>
                        Questions 01
                      </button>
                      <button
                        className="nav-link active"
                        id="nav-community-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-community-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-community-2"
                        aria-selected="false"
                      >
                        <span>
                          <i className="icon-envelope-b"></i>
                        </span>
                        Questions 02
                      </button>
                      <button
                        className="nav-link"
                        id="nav-support-2-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-support-2"
                        type="button"
                        role="tab"
                        aria-controls="nav-support-2"
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
                className="faq-tab-content wow bdFadeInUp"
                data-wow-delay=".6s"
                data-wow-duration="1s"
              >
                <div className="tab-content" id="nav-tabContent_2">
                  <div
                    className="tab-pane fade"
                    id="nav-general-2"
                    role="tabpanel"
                    aria-labelledby="nav-general-2-tab"
                  >
                    <div className="accordion-wrapper">
                      <div className="accordion" id="accordionExampleEight">
                        {faqElementStyle2?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={faq?.id}>
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
                            </h2>
                            <div
                              id={`collapse${faq.id}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={faq.id}
                              data-bs-parent="#accordionExampleEight"
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
                    className="tab-pane fade active show"
                    id="nav-community-2"
                    role="tabpanel"
                    aria-labelledby="nav-community-2-tab"
                  >
                    <div className="accordion-wrapper">
                      <div className="accordion" id="accordionExampleNine">
                        {faqElementStyle2?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={faq?.id}>
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
                            </h2>
                            <div
                              id={`collapse${faq.id}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={faq.id}
                              data-bs-parent="#accordionExampleNine"
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
                    id="nav-support-2"
                    role="tabpanel"
                    aria-labelledby="nav-support-2-tab"
                  >
                    <div className="accordion-wrapper">
                      <div className="accordion" id="accordionExampleTen">
                        {faqElementStyle2?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={faq?.id}>
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
                            </h2>
                            <div
                              id={`collapse${faq.id}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={faq.id}
                              data-bs-parent="#accordionExampleTen"
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

export default AdanceTabTwo;
