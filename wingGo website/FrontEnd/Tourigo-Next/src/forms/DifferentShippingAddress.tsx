"use client";
import { selectLocationData } from "@/data/nice-select-data";
import NiceSelect from "@/elements/NiceSelect";
import React, { useState } from "react";

const DifferentShippingAddress = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const selectHandler = () => {};
  return (
    <>
      <div className="different-address mb-24">
        <div className="checkout-option mb-15">
          <input
            id="ship-box"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="ship-box">Ship to a different address?</label>
        </div>
        {isChecked && (
          <div
            id="ship-box-info"
            style={{
              display: isChecked === true ? "block" : "none",
            }}
          >
            <div className="row gy-24">
              <div className="col-md-12">
                <div className="checkout-input">
                  <label>State / County</label>
                  <NiceSelect
                    options={selectLocationData}
                    defaultCurrent={0}
                    onChange={selectHandler}
                    name="country"
                    className="checkout-country country-list"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    First Name <span>*</span>
                  </label>
                  <input type="text" placeholder="First Name" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    Last Name <span>*</span>
                  </label>
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkout-input">
                  <label>Company Name</label>
                  <input type="text" placeholder="Company Name" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkout-input">
                  <label>
                    Apartment/Suite No. <span>*</span>
                  </label>
                  <input type="text" placeholder="Street address" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkout-input">
                  <label>
                    Address <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkout-input">
                  <label>
                    Town / City <span>*</span>
                  </label>
                  <input type="text" placeholder="Town / City" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    State / County <span>*</span>
                  </label>
                  <input type="text" placeholder="State / County" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    Postcode / Zip <span>*</span>
                  </label>
                  <input type="text" placeholder="Postcode / Zip" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    Email Address <span>*</span>
                  </label>
                  <input type="email" placeholder="Email address" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-input">
                  <label>
                    Phone <span>*</span>
                  </label>
                  <input type="text" placeholder="Postcode / Zip" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DifferentShippingAddress;
