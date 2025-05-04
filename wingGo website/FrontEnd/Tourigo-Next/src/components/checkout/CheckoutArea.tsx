import CheckoutForm from "@/forms/CheckoutForm";
import React from "react";
import OrderDetails from "./OrderDetails";
import CheckoutLogin from "./CheckoutLogin";
import AddCuponMain from "./AddCuponMain";

const CheckoutArea = () => {
  return (
    <>
      <section className="checkout-area section-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="checkout-verify mb-24">
                <CheckoutLogin />
                <AddCuponMain />
              </div>
              <div className="checkout-bill-area">
                <h3 className="checkout-bill-title">Billing Details</h3>
                <div className="checkout-bill-form">
                  <CheckoutForm />
                </div>
              </div>
            </div>
            <OrderDetails />
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
