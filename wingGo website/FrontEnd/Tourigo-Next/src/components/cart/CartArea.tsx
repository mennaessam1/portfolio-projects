"use client";
import { ProductsType } from "@/interFace/interFace";
import {
  cart_product,
  clear_cart,
  decrease_quantity,
  remove_cart_product,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import CrossIcon from "@/svg/CrossIcon";
import MinusIcon from "@/svg/MinusIcon";
import PlusIcon from "@/svg/PlusIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CartArea = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const totalPrice = cartProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.quantity ?? 0),
    0
  );
  const removeAllProduct = () => {
    dispatch(clear_cart());
  };

  const handleAddToCart = (product: ProductsType) => {
    dispatch(cart_product(product));
  };

  const handDecressCart = (product: ProductsType) => {
    dispatch(decrease_quantity(product));
  };

  const handleDelteProduct = (product: ProductsType) => {
    dispatch(remove_cart_product(product));
  };

  const handleExtraMoney = (extra: number) => {
    setTotal(totalPrice + extra);
  };

  const handleChange = (e: any) => {};
  return (
    <>
      <section className="bd-cart-area section-space">
        <div className="container">
          {cartProducts?.length ? (
            <>
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="bd-cart-list mb-25 mr-30">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="bd-cart-header-product">
                            Product
                          </th>
                          <th className="bd-cart-header-price">Price</th>
                          <th className="bd-cart-header-quantity">Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts?.map((item, index) => {
                          const totalAmount = item?.price * item?.quantity;
                          return (
                            <tr key={index}>
                              <td className="bd-cart-img image-hover-effect">
                                <Link href="/shop-details">
                                  {" "}
                                  <Image src={item?.image} alt="image" />
                                </Link>
                              </td>

                              <td className="bd-cart-title">
                                <Link href="/shop-details">{item?.title}</Link>
                              </td>

                              <td className="bd-cart-price">
                                <span>${totalAmount.toFixed(2)}</span>
                              </td>

                              <td className="bd-cart-quantity">
                                <div className="bd-product-quantity">
                                  <span
                                    className="bd-cart-minus"
                                    onClick={() => handDecressCart(item)}
                                  >
                                    <MinusIcon />
                                  </span>
                                  <input
                                    className="bd-cart-input"
                                    type="text"
                                    onChange={handleChange}
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <span
                                    className="bd-cart-plus"
                                    onClick={() => handleAddToCart(item)}
                                  >
                                    <PlusIcon />
                                  </span>
                                </div>
                              </td>

                              <td className="bd-cart-action">
                                <button
                                  className="bd-cart-action-btn"
                                  onClick={() => handleDelteProduct(item)}
                                >
                                  <CrossIcon />
                                  <span className="ml-1">Remove</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="bd-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-7 col-md-8">
                        <div className="bd-cart-coupon">
                          <form action="#">
                            <div className="bd-cart-coupon-input-box">
                              <label>Coupon Code:</label>
                              <div className="bd-cart-coupon-input d-flex flex-wrap gap-15 align-items-center">
                                <input
                                  type="text"
                                  placeholder="Enter Coupon Code"
                                />
                                <button
                                  type="submit"
                                  className="bd-primary-btn btn-style is-bg radius-60"
                                >
                                  <span className="bd-primary-btn-text">
                                    Apply Coupon
                                  </span>
                                  <span className="bd-primary-btn-circle"></span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-xl-5 col-md-4">
                        <div className="bd-cart-update text-md-end">
                          <button
                            onClick={removeAllProduct}
                            type="button"
                            className="bd-primary-btn btn-style is-bg radius-60"
                          >
                            <span className="bd-primary-btn-text">
                              Clear Cart
                            </span>
                            <span className="bd-primary-btn-circle"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="bd-cart-checkout-wrapper">
                    <div className="bd-cart-checkout-top d-flex align-items-center justify-content-between">
                      <span className="bd-cart-checkout-top-title">
                        Subtotal
                      </span>
                      <span className="bd-cart-checkout-top-price">
                        ${totalPrice.toFixed(0)}
                      </span>
                    </div>
                    <div className="bd-cart-checkout-shipping">
                      <h4 className="bd-cart-checkout-shipping-title">
                        Shipping
                      </h4>
                      <div className="bd-cart-checkout-shipping-option-wrapper">
                        <div className="bd-cart-checkout-shipping-option">
                          <input
                            id="flat_rate"
                            type="radio"
                            name="shipping"
                            onChange={() => handleExtraMoney(20)}
                          />
                          <label htmlFor="flat_rate">
                            Flat rate: <span>$20.00</span>
                          </label>
                        </div>
                        <div className="bd-cart-checkout-shipping-option">
                          <input
                            id="local_pickup"
                            type="radio"
                            name="shipping"
                            onChange={() => handleExtraMoney(25)}
                          />
                          <label htmlFor="local_pickup">
                            Local pickup: <span> $25.00</span>
                          </label>
                        </div>
                        <div className="bd-cart-checkout-shipping-option">
                          <input
                            id="free_shipping"
                            type="radio"
                            name="shipping"
                            onChange={() => handleExtraMoney(0)}
                          />
                          <label htmlFor="free_shipping">Free shipping</label>
                        </div>
                      </div>
                    </div>
                    <div className="bd-cart-checkout-total d-flex align-items-center justify-content-between">
                      <span>Total</span>
                      <span>
                        ${total > 0 ? total.toFixed(2) : totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="bd-cart-checkout-proceed">
                      <Link
                        href="/checkout"
                        className="bd-primary-btn btn-style is-bg radius-60 w-100"
                      >
                        <span className="bd-primary-btn-text">
                          Proceed to Checkout
                        </span>
                        <span className="bd-primary-btn-circle"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center">No Cart Product Found</h3>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CartArea;
