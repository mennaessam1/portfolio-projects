"use client";
import AddCuponForm from "@/forms/AddCuponForm";
import React, { useState } from "react";

const AddCuponMain = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="checkout-verify-item">
        <p className="checkout-verify-reveal">
          Have a coupon?
          <button
            type="button"
            className="checkout-coupon-form-reveal-btn"
            onClick={handleCheckboxChange}
          >
            Click here to enter your code
          </button>
        </p>
        {isChecked && (
          <div
            id="checkoutCouponForm"
            className="return-customer"
            style={{
              display: isChecked === true ? "block" : "none",
            }}
          >
            <AddCuponForm />
          </div>
        )}
      </div>
    </>
  );
};

export default AddCuponMain;
