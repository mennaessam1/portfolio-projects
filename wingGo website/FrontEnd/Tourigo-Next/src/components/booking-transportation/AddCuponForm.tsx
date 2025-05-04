"use client";
import React, { useRef } from "react";

interface AddCuponFormProps {
  setPromocode: React.Dispatch<React.SetStateAction<string>>;
}

const AddCuponForm: React.FC<AddCuponFormProps> = ({ setPromocode }) => {
  const couponRef = useRef<HTMLInputElement>(null);

  const handleApplyCoupon = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    const couponCode = couponRef.current?.value.trim() || ""; // Get coupon code
    setPromocode(couponCode); // Pass the coupon code to the parent
    console.log("Coupon applied:", couponCode); // For debugging
  };

  return (
    <form onSubmit={handleApplyCoupon}>
      <div className="return-customer-input">
        <label>Coupon Code :</label>
        <input
          type="text"
          name="couponCode"
          placeholder="Coupon"
          ref={couponRef} // Attach the ref
        />
      </div>
      <button
        type="submit"
        className="bd-primary-btn btn-style is-bg radius-60"
      >
        <span className="bd-primary-btn-text">Apply Coupon</span>
        <span className="bd-primary-btn-circle"></span>
      </button>
    </form>
  );
};

export default AddCuponForm;
