"use client";
import React, { useState, useRef } from "react";

interface AddCuponMainProps {
  setPromocode: React.Dispatch<React.SetStateAction<string>>;
}

const AddCuponMain: React.FC<AddCuponMainProps> = ({ setPromocode }) => {
  const [isChecked, setIsChecked] = useState(true);
  const couponRef = useRef<HTMLInputElement>(null); // Ref for coupon input field

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };



  const handleApplyCoupon = () => {
    const couponCode = couponRef.current?.value.trim() || ""; // Get coupon code from input
    if (couponCode) {
      setPromocode(couponCode); // Update promo code in the parent component
      console.log("Coupon applied:", couponCode); // Debugging log
    } else {
      console.log("No coupon code entered."); // Debugging log for empty input
    }
  };

  return (
    <div className="checkout-verify-item">
      {/* <p className="checkout-verify-reveal">
        Have a coupon?
        <button
          type="button"
          className="checkout-coupon-form-reveal-btn"
          onClick={handleCheckboxChange}
        >
          Click here to enter your code
        </button>
      </p> */}
      {isChecked && (
        <div
          id="checkoutCouponForm"
          className="return-customer"
          style={{ display: "block" }}
        >
         
            <div className="return-customer-input">
              <label>Coupon Code :</label>
              <input
                type="text"
                name="couponCode"
                placeholder="Coupon"
                ref={couponRef}
              />
            </div>
            <button
            // onClick={handleApplyCoupon}
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              handleApplyCoupon();
              // setNumberOfPeople((prev) => Math.max(1, prev - 1));
            }}
              type="submit"
              className="bd-primary-btn btn-style is-bg radius-30"
            >
              <span className="bd-primary-btn-text">Apply Coupon</span>
              <span className="bd-primary-btn-circle"></span>
            </button>
        
        </div>
      )}
    </div>
  );
};

export default AddCuponMain;
