"use client";
import SignInForm from "@/forms/SignInForm";
import React, { useState } from "react";

const CheckoutLogin = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="checkout-verify-item">
        <p className="checkout-verify-reveal">
          Returning customer?
          <button
            type="button"
            className="checkout-login-form-reveal-btn"
            onClick={handleCheckboxChange}
          >
            Click here to login
          </button>
        </p>
        {isChecked && (
          <div
            id="returnCustomerLoginForm"
            className="return-customer"
            style={{
              display: isChecked === true ? "block" : "none",
            }}
          >
            <SignInForm />
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutLogin;
