import React from "react";

const DefaultFromwithIconLeft = () => {
  return (
    <>
      <section className="bd-element-button section-space-bottom">
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
                      Default From with Icon Left
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
                  <div className="form-input-box has-icon icon-left">
                    <div className="form-input">
                      <input name="name" type="text" placeholder="Your Name" />
                      <div className="">
                        <span>
                          <i className="fa-solid fa-user"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box has-icon icon-left">
                    <div className="form-input">
                      <input name="name" type="text" placeholder="Your Email" />
                      <div className="">
                        <span>
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box has-icon icon-left">
                    <div className="form-input">
                      <input name="name" type="text" placeholder="Your Phone" />
                      <div className="">
                        <span>
                          <i className="fa-solid fa-phone"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box has-icon icon-left">
                    <div className="form-input">
                      <input name="name" type="text" placeholder="Subject" />
                      <div className="">
                        <span>
                          <i className="fa-solid fa-book"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <div className="form-input-box has-icon icon-left">
                    <div className="form-input">
                      <textarea
                        name="name"
                        placeholder="Your Message"
                      ></textarea>
                      <div className="">
                        <span>
                          <i className="fa-solid fa-pen"></i>
                        </span>
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

export default DefaultFromwithIconLeft;
