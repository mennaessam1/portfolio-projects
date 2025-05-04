"use client";
import { selectLocationData } from "@/data/nice-select-data";
import NiceSelect from "@/elements/NiceSelect";
import React from "react";
const FormElements = () => {
  const selectHandler = () => {};
  return (
    <>
      <div id="formElements" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Form Elements</h4>
          <div className="form-input-wrapper">
            <div className="row gy-24">
              <div className="col-lg-6">
                <div className="form-input-box">
                  <div className="">
                    <input
                      name="name"
                      id="firstName"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-input-box">
                  <div className="">
                    <input
                      name="name"
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-input-box">
                  <div className="form-input-title">
                    <label htmlFor="firstName3">
                      First name<span>*</span>
                    </label>
                  </div>
                  <div className="">
                    <input
                      name="name"
                      id="firstName3"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-input-box">
                  <div className="form-input-title">
                    <label htmlFor="lastName2">
                      Last name<span>*</span>
                    </label>
                  </div>
                  <div className="">
                    <input
                      name="name"
                      id="lastName2"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>
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
                <div className="form-input-box has-icon icon-right">
                  <div className="form-input">
                    <input name="name2" type="text" placeholder="Your Name" />
                    <div className="">
                      <span>
                        <i className="fa-solid fa-user"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-input-box has-icon icon-right">
                  <div className="form-input">
                    <input name="email2" type="text" placeholder="Your Email" />
                    <div className="">
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-input-box">
                  <div className="contentHidden">
                    <label>
                      Textarea<span>*</span>
                    </label>
                  </div>
                  <div className="form-input">
                    <textarea name="name" placeholder="Your Message"></textarea>
                    <div className="">
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                    </div>
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
                    <textarea name="name" placeholder="Your Message"></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 text-center">
                <div className="form-input-box has-icon icon-right">
                  <div className="form-input">
                    <textarea
                      name="message"
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
              <div className="col-lg-12 text-center">
                <div className="form-input-box">
                  <div className="floating-form-input">
                    <textarea className="textareaText"></textarea>
                    <span className="floating-label-two">Your Message</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row gy-24">
                  <div className="col-lg-6">
                    <div className="form-input">
                      <div className="form-input-title">
                        <label>
                          select option<span>*</span>
                        </label>
                      </div>
                      <div className="form__select">
                        <select>
                          <option>Select option One</option>
                          <option>Select option Two</option>
                          <option>Select option Three</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-input">
                      <div className="form-input-title mb-5">
                        <label>Nice select option</label>
                      </div>

                      <div className="shop-selector">
                        <NiceSelect
                          options={selectLocationData}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name="years"
                          className="select-age"
                          placeholder="Select Location"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <h4 className="mb-20">Radio Button</h4>
                <div className="singel__radio mb-10">
                   
                  <input
                    type="radio"
                    id="radio-d"
                    name="Default"
                    defaultValue="radio-d"
                  />
                   <label htmlFor="radio-d">Default</label>
                </div>
                <div className="singel__radio mb-10">
                   
                  <input
                    type="radio"
                    id="radio-s"
                    name="Selected"
                    defaultValue="radio-s"
                  />
                   <label htmlFor="radio-s">Selected</label>
                </div>
              </div>
              <div className="col-lg-4">
                <h4 className="mb-20">Checkbox Button</h4>
                <div className="checkout-option mb-15">
                  <input id="checkboxDefault" type="checkbox" />
                  <label htmlFor="checkboxDefault">Checkbox</label>
                </div>
                <div className="checkout-option mb-15">
                  <input id="checkboxChecked" type="checkbox" defaultChecked />
                  <label htmlFor="checkboxChecked">checked</label>
                </div>
              </div>
              <div className="col-lg-4">
                <h4 className="mb-20">Switch checkbox</h4>
                <div className="singel__switch d-flex align-content-center gap-3 mb-10">
                  <label className="switch-checkbox">
                    <input type="checkbox" />
                    <span className="switch round"></span>
                  </label>
                  <p className="mb-0">Default</p>
                </div>
                <div className="singel__switch d-flex align-content-center gap-3 mb-10">
                  <label className="switch-checkbox">
                    <input type="checkbox" />
                    <span className="switch round"></span>
                  </label>
                  <p className="mb-0">Selected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
