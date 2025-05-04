import { faqElementStyle3 } from "@/data/faq-data";
import React from "react";

const AdanceTabThree = () => {
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
                      Tab With Accordion Style 03
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-12">
              <div className="faq-tab-2 tp-tab mb-50">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="general-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#general"
                      type="button"
                      role="tab"
                      aria-controls="general"
                      aria-selected="true"
                    >
                      <span>
                        <i className="icon-support"></i>
                      </span>
                      Questions 01
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="community-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#community"
                      type="button"
                      role="tab"
                      aria-controls="community"
                      aria-selected="false"
                    >
                      <span>
                        <i className="icon-envelope-b"></i>
                      </span>
                      Questions 02
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="support-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#support"
                      type="button"
                      role="tab"
                      aria-controls="support"
                      aria-selected="false"
                    >
                      <span>
                        <i className="icon-share"></i>
                      </span>
                      Questions 03
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="faq-item-wrapper">
            <div className="tab-content" id="faqTabContent">
              <div
                className="tab-pane fade show active"
                id="general"
                role="tabpanel"
                aria-labelledby="general-tab"
              >
                <div className="faq-item">
                  <div className="row gy-24">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      <div className="faq-content">
                        <h3 className="faq-title-2">
                          Questions <br />
                          &amp; Answer
                        </h3>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12">
                      <div className="accordion-wrapper faq-style-3">
                        <div className="accordion" id="accordionExampleEleven">
                          {faqElementStyle3?.map((faq, index) => (
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
                                data-bs-parent="#accordionExampleEleven"
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
              <div
                className="tab-pane fade"
                id="community"
                role="tabpanel"
                aria-labelledby="community-tab"
              >
                <div className="faq-item">
                  <div className="row gy-24">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      <div className="faq-content">
                        <h3 className="faq-title-2">
                          Tour <br />
                          &amp; Package
                        </h3>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12">
                      <div className="accordion-wrapper faq-style-3">
                        <div
                          className="accordion"
                          id="accordionExampleFourteen"
                        >
                          {faqElementStyle3?.map((faq, index) => (
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
                                data-bs-parent="#accordionExampleFourteen"
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
              <div
                className="tab-pane fade"
                id="support"
                role="tabpanel"
                aria-labelledby="support-tab"
              >
                <div className="faq-item">
                  <div className="row gy-24">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      <div className="faq-content">
                        <h3 className="faq-title-2">Trip Details</h3>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12">
                      <div className="accordion-wrapper faq-style-3">
                        <div className="accordion" id="accordionExampleFifteen">
                          {faqElementStyle3?.map((faq, index) => (
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
                                data-bs-parent="#accordionExampleFifteen"
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
        </div>
      </section>
    </>
  );
};

export default AdanceTabThree;
