import { faqElementStyle5 } from "@/data/faq-data";
import Link from "next/link";
import React from "react";

const FaqStyleFive = () => {
  return (
    <>
      <section className="faq__area section-space-bottom p-relative z-index-1 fix">
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
                      FAQ Style 05
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
                        {faqElementStyle5?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={`heading${faq.id}`}
                            >
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
                                  load more{" "}
                                  <i className="icon-arrow_forward"></i>
                                </Link>
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
                        {faqElementStyle5?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={`heading${faq.id}`}
                            >
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
                                  load more{" "}
                                  <i className="icon-arrow_forward"></i>
                                </Link>
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
                        {faqElementStyle5?.map((faq, index) => (
                          <div key={index} className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={`heading${faq.id}`}
                            >
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
                                  load more{" "}
                                  <i className="icon-arrow_forward"></i>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqStyleFive;
