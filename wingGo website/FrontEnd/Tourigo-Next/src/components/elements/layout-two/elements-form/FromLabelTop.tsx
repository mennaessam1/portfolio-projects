import React from "react";

const FromLabelTop = () => {
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
                      From Label Top
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
              <div className="row gy-24 align-items-center justify-content-center">
                <div className="col-lg-6">
                  <div className="form-input-box">
                    <div className="form-input-title">
                      <label htmlFor="firstName">
                        First Name<span>*</span>
                      </label>
                    </div>
                    <div className="form-input">
                      <input
                        name="name"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box">
                    <div className="form-input-title">
                      <label htmlFor="lastName">
                        Last Name<span>*</span>
                      </label>
                    </div>
                    <div className="form-input">
                      <input
                        name="name"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box">
                    <div className="form-input-title">
                      <label htmlFor="phoneNumber">
                        Phone Number<span>*</span>
                      </label>
                    </div>
                    <div className="form-input">
                      <input
                        name="name"
                        id="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-input-box">
                    <div className="form-input-title">
                      <label htmlFor="password2">
                        Password<span>*</span>
                      </label>
                    </div>
                    <div className="form-input">
                      <input
                        name="name"
                        id="password2"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <div className="form-input-box">
                    <div className="form-input-title">
                      <label>
                        Your Message<span>*</span>
                      </label>
                    </div>
                    <div className="form-input">
                      <textarea name="name" placeholder=""></textarea>
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

export default FromLabelTop;
