import React from "react";

const AddCuponForm = () => {
  return (
    <>
      <form action="#">
        <div className="return-customer-input">
          <label>Coupon Code :</label>
          <input type="text" placeholder="Coupon" />
        </div>
        <button
          type="submit"
          className="bd-primary-btn btn-style is-bg radius-60"
        >
          <span className="bd-primary-btn-text">Apply Coupon</span>
          <span className="bd-primary-btn-circle"></span>
        </button>
      </form>
    </>
  );
};

export default AddCuponForm;
