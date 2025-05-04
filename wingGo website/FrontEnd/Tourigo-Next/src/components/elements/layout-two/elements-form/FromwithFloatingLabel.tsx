import React from "react";

const FromwithFloatingLabel = () => {
  return (
    <>
      <section className="bd-element-button section-space-bottom">
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
                      From with Floating Label
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="row g-5 align-items-center justify-content-center">
                <div className="col-lg-6">
                  <div className="floating-form-input">
                    <input type="text" className="inputText" />
                    <span className="floating-label">Full Name</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="floating-form-input">
                    <input type="text" className="inputText" />
                    <span className="floating-label">Your Email</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="floating-form-input">
                    <input type="number" className="inputText" />
                    <span className="floating-label">Phone Number</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="floating-form-input">
                    <input type="text" className="inputText" />
                    <span className="floating-label">Subject</span>
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <div className="form-input-box">
                    <div className="floating-form-input">
                      <textarea className="textareaText"></textarea>
                      <span className="floating-label-two">Your Message</span>
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

export default FromwithFloatingLabel;
