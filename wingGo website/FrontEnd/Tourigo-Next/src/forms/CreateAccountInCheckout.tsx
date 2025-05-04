"use client";
import React, { useState } from "react";

const CreateAccountInCheckout = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="col-md-12">
        <div className="checkout-option-wrapper create-acc">
          <div className="checkout-option mb-15">
            <input id="cbox" type="checkbox" onChange={handleCheckboxChange} />
            <label htmlFor="cbox">Create an account?</label>
          </div>
          {isChecked && (
            <div
              id="cbox_info"
              className="checkout-input create-account"
              style={{
                display: isChecked === true ? "block" : "none",
              }}
            >
              <p>
                Create an account by entering the information below. If you are
                a returning customer please login at the top of the page.
              </p>
              <label>
                Account Password <span>*</span>
              </label>
              <input type="password" placeholder="Password" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAccountInCheckout;
