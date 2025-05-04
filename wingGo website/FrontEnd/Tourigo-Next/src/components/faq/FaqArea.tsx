import { faqData } from "@/data/faq-data";
import React from "react";

const FaqArea = () => {
  return (
    <>
      <section className="bd-tour-listing-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="accordion-wrapper faq-style-3">
                <div className="accordion" id="accordionExampleThree">
                  {faqData.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                      <h6 className="accordion-header" id={`heading${faq.id}`}>
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
                          <span>{`Q${index + 1}:`}</span> {faq.question}
                        </button>
                      </h6>
                      <div
                        id={`collapse${faq.id}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${faq.id}`}
                        data-bs-parent="#accordionExampleThree"
                      >
                        <div className="accordion-body">{faq.answer}</div>
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

export default FaqArea;
