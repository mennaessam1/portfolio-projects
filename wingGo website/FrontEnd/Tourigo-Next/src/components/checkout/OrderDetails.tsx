"use client";
import React, { useState } from "react";
import SelectPaymentType from "./SelectPaymentType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
const OrderDetails = () => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [shipingAmount, setShipingAmount] = useState(0);
  const [shipingTitle, setShipingTitle] = useState("");
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.quantity ?? 0),
    0
  );
  const handleExtraMoney = (extra: number, text: string) => {
    setTotal(totalPrice + extra);
    setShipingTitle(text);
    setShipingAmount(extra);
  };
  const handleSubmit = () => {
    const shipingInfo = `${shipingTitle} ${shipingAmount}`;
    localStorage.setItem("Shiping Info", shipingInfo);
    router.push("/order");
  };
  return (
    <>
      <div className="col-lg-5">
        <div className="checkout-place sidebar-sticky">
          <h3 className="checkout-place-title">Your Order</h3>
          <div className="order-info-list">
            <ul>
              <li className="order-info-list-header">
                <h4>Product</h4>
                <h4>Total</h4>
              </li>

              {cartProducts?.length ? (
                <>
                  {cartProducts?.map((item, index) => {
                    const totalAmount = item?.price * item?.quantity;
                    return (
                      <li key={index} className="order-info-list-desc">
                        <p>
                          {item?.title} <span> x {item?.quantity}</span>
                        </p>
                        <span>${totalAmount}</span>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  <li className="order-info-list-desc">
                    <p>
                      Tourigo Short sleeve t-shirts <span> x 1</span>
                    </p>
                    <span>$499:00</span>
                  </li>
                  <li className="order-info-list-desc">
                    <p>
                      Tourigo Backpack - 21L <span> x 1</span>
                    </p>
                    <span>$999:00</span>
                  </li>
                </>
              )}

              <li className="order-info-list-subtotal">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>

              <li className="order-info-list-shipping">
                <span>Shipping</span>
                <div className="order-info-list-shipping-item d-flex flex-column align-items-start">
                  <span>
                    <input
                      id="flat_rate"
                      type="radio"
                      name="shipping"
                      onChange={() => handleExtraMoney(20, "Flat Rate")}
                    />
                    <label htmlFor="flat_rate">
                      Flat rate: <span>$20.00</span>
                    </label>
                  </span>
                  <span>
                    <input
                      id="local_pickup"
                      type="radio"
                      name="shipping"
                      onChange={() => handleExtraMoney(25, "Local Pickup")}
                    />
                    <label htmlFor="local_pickup">
                      Local pickup: <span>$25.00</span>
                    </label>
                  </span>
                  <span>
                    <input
                      id="free_shipping"
                      type="radio"
                      name="shipping"
                      onChange={() => handleExtraMoney(0, "Free Shipping")}
                    />
                    <label htmlFor="free_shipping">Free shipping</label>
                  </span>
                </div>
              </li>

              <li className="order-info-list-total">
                <span>Total</span>
                <span>
                  ${total > 0 ? total.toFixed(2) : totalPrice.toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          <div className="checkout-payment">
            <SelectPaymentType />
          </div>
          <div className="checkout-agree">
            <div className="checkout-option mb-15">
              <input id="read_all" type="checkbox" />
              <label htmlFor="read_all">
                I have read and agree to the website.
              </label>
            </div>
          </div>
          <div className="checkout-btn-wrapper">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bd-primary-btn btn-style is-bg radius-60 w-100"
            >
              <span className="bd-primary-btn-text">Place Order</span>
              <span className="bd-primary-btn-circle"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
