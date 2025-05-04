import { faqElementStyle7 } from "@/data/faq-data";
import Link from "next/link";
import React from "react";

const FaqStyleSeven = () => {
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
                      FAQ Style 07
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
                          {faqElementStyle7?.map((faq, index) => (
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
                                data-bs-parent="#accordionExampleEight"
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
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortyFour"
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortyFour"
                                aria-expanded="true"
                                aria-controls="collapseFortyFour"
                              >
                                <span>Q.</span> What should I pack for my trip?
                              </button>
                            </h2>
                            <div
                              id="collapseFortyFour"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingFortyFour"
                              data-bs-parent="#accordionExampleFourteen"
                            >
                              <div className="accordion-body">
                                Create comprehensive packing lists tailored to
                                different types of trips (e.g., beach vacation,
                                hiking adventure, city exploration).
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortyFive"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortyFive"
                                aria-expanded="false"
                                aria-controls="collapseFortyFive"
                              >
                                <span>Q.</span> How do I find the best deals on
                                flights and accommodations?
                              </button>
                            </h2>
                            <div
                              id="collapseFortyFive"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingFortyFive"
                              data-bs-parent="#accordionExampleFourteen"
                            >
                              <div className="accordion-body">
                                Share strategies for booking flights and
                                accommodations at the lowest prices, such as
                                using fare comparison websites, booking in
                                advance, and being flexible with travel dates.
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortySix"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortySix"
                                aria-expanded="false"
                                aria-controls="collapseFortySix"
                              >
                                <span>Q.</span> What are some tips for staying
                                safe while traveling abroad?
                              </button>
                            </h2>
                            <div
                              id="collapseFortySix"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingFortySix"
                              data-bs-parent="#accordionExampleFourteen"
                            >
                              <div className="accordion-body">
                                Discuss common safety precautions, such as
                                avoiding unsafe areas, securing valuables, and
                                staying vigilant in crowded places.
                              </div>
                            </div>
                          </div>
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
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortySeven"
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortySeven"
                                aria-expanded="true"
                                aria-controls="collapseFortySeven"
                              >
                                <span>Q.</span> What should I pack for my trip?
                              </button>
                            </h2>
                            <div
                              id="collapseFortySeven"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingFortySeven"
                              data-bs-parent="#accordionExampleFifteen"
                            >
                              <div className="accordion-body">
                                Create comprehensive packing lists tailored to
                                different types of trips (e.g., beach vacation,
                                hiking adventure, city exploration).
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortyEight"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortyEight"
                                aria-expanded="false"
                                aria-controls="collapseFortyEight"
                              >
                                <span>Q.</span> How do I find the best deals on
                                flights and accommodations?
                              </button>
                            </h2>
                            <div
                              id="collapseFortyEight"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingFortyEight"
                              data-bs-parent="#accordionExampleFifteen"
                            >
                              <div className="accordion-body">
                                Share strategies for booking flights and
                                accommodations at the lowest prices, such as
                                using fare comparison websites, booking in
                                advance, and being flexible with travel dates.
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="headingFortyNine"
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFortyNine"
                                aria-expanded="false"
                                aria-controls="collapseFortyNine"
                              >
                                <span>Q.</span> What are some tips for staying
                                safe while traveling abroad?
                              </button>
                            </h2>
                            <div
                              id="collapseFortyNine"
                              className="accordion-collapse collapse"
                              aria-labelledby="headingFortyNine"
                              data-bs-parent="#accordionExampleFifteen"
                            >
                              <div className="accordion-body">
                                Discuss common safety precautions, such as
                                avoiding unsafe areas, securing valuables, and
                                staying vigilant in crowded places.
                              </div>
                            </div>
                          </div>
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

export default FaqStyleSeven;
