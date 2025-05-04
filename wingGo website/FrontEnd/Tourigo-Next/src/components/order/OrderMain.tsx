"use client";
import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import OrderConfirmIcon from "@/svg/OrderConfirmIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const OrderMain = () => {
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.quantity ?? 0),
    0
  );

  const shippingObj = localStorage.getItem("Shiping Info");

  const parts = shippingObj ? shippingObj.split(" ") : [];
  let price = "";
  let shippingTitle = "";
  // Check if parts is not empty and has at least two elements
  if (parts.length >= 2) {
    // Combine all parts except the last one for the shipping title
    shippingTitle = parts.slice(0, parts.length - 1).join(" ");

    // The last part is the price
    price = parts[parts.length - 1];
  } else {
  }
  const priceNum = parseInt(price);
  const totalAmount = totalPrice + priceNum;

  return (
    <>
      <Breadcrumb titleOne="Order Confirm" titleTwo="Order" />
      <section className="order-area section-space">
        <div className="container">
          <div className="row gx-0 justify-content-center">
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-12">
              <div className="order-inner">
                <div className="order-details mb-35">
                  <div className="order-details-top text-center mb-70">
                    <div className="order-details-icon">
                      <span>
                        <OrderConfirmIcon />
                      </span>
                    </div>
                    <div className="order-details-content">
                      <h3 className="order-details-title mb-15">
                        Your Order Confirmed
                      </h3>
                      <p>
                        {`We're`} excited to inform you that your order is on
                        its way! As soon as your package ships, {`we'll`} send
                        you a shipping confirmation email with all the necessary
                        details to track your delivery.
                      </p>
                      <p>
                        Thank you for choosing us for your purchase. We
                        appreciate your patience and support.
                      </p>
                    </div>
                  </div>
                  <div className="order-details-item-wrapper">
                    <div className="row justify-content-start gy-24">
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Order Date:</h4>
                          <p>February 29 2024</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Expected Delivery: </h4>
                          <p>March 25 2024</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Order Number:</h4>
                          <p>#TG-0985</p>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-sm-6">
                        <div className="order-details-item">
                          <h4>Payment Method:</h4>
                          <p>Credit Card</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {cartProducts?.length ? (
                  <>
                    <div className="order-info-wrapper">
                      <h4 className="order-info-title">Order Details</h4>

                      <div className="order-info-list">
                        <ul>
                          <li className="order-info-list-header">
                            <h4>Product</h4>
                            <h4>Total</h4>
                          </li>

                          {cartProducts?.map((item, index) => {
                            return (
                              <li key={index} className="order-info-list-desc">
                                <p>
                                  {item?.title} <span> x {item?.quantity}</span>
                                </p>
                                <span>${item?.price * item?.quantity}</span>
                              </li>
                            );
                          })}

                          <li className="order-info-list-subtotal">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </li>

                          <li className="order-info-list-shipping">
                            <span>Shipping</span>
                            <div className="order-info-list-shipping-item d-flex flex-column align-items-end">
                              <span>
                                <input id="shipping_info" type="checkbox" />
                                <label htmlFor="shipping_info">
                                  {shippingTitle}:{" "}
                                  <span>${priceNum.toFixed(2)}</span>
                                </label>
                              </span>
                            </div>
                          </li>

                          <li className="order-info-list-total">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="order-info-wrapper">
                      <h4 className="order-info-title">Order Details</h4>

                      <div className="order-info-list">
                        <ul>
                          <li className="order-info-list-header">
                            <h4>Product</h4>
                            <h4>Total</h4>
                          </li>

                          <li className="order-info-list-desc">
                            <p>
                              Tourigo Short sleeve t-shirts <span> x 2</span>
                            </p>
                            <span>$499.00</span>
                          </li>
                          <li className="order-info-list-desc">
                            <p>
                              Tourigo Backpack <span> x 1</span>
                            </p>
                            <span>$140.00</span>
                          </li>

                          <li className="order-info-list-subtotal">
                            <span>Subtotal</span>
                            <span>$766.00</span>
                          </li>

                          <li className="order-info-list-shipping">
                            <span>Shipping</span>
                            <div className="order-info-list-shipping-item d-flex flex-column align-items-end">
                              <span>
                                <input id="shipping_info" type="checkbox" />
                                <label htmlFor="shipping_info">
                                  Flat rate::
                                  <span>$20.00</span>
                                </label>
                              </span>
                            </div>
                          </li>

                          <li className="order-info-list-total">
                            <span>Total</span>
                            <span>$788.00</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderMain;
