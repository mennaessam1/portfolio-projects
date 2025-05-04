"use client";
import { ProductsType } from "@/interFace/interFace";
import { cart_product, cart_wishlist_product } from "@/redux/slices/cartSlice";
import {
  decrease_wishlist_quantity,
  remove_wishlist_product,
  wishlist_product,
} from "@/redux/slices/wishlistSlice";
import { RootState } from "@/redux/store";
import CrossIcon from "@/svg/CrossIcon";
import MinusIcon from "@/svg/MinusIcon";
import PlusIcon from "@/svg/PlusIcon";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const WishlistArea = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.cartProducts
  );

  const totalPrice = wishlistProducts.reduce(
    (total, product) => total + (product.price ?? 0) * (product.quantity ?? 0),
    0
  );

  const handleAddToCart = (product: ProductsType) => {
    const modifyProduct = wishlistProducts.find(
      (item) => item.id === product?.id
    );
    if (modifyProduct) {
      dispatch(cart_wishlist_product(modifyProduct));
    }
  };
  const handleIncressWishlist = (product: ProductsType) => {
    dispatch(wishlist_product(product));
  };

  const handDecressCart = (product: ProductsType) => {
    dispatch(decrease_wishlist_quantity(product));
  };

  const handleDelteProduct = (product: ProductsType) => {
    dispatch(remove_wishlist_product(product));
  };

  const handleChange = (e: any) => {};
  return (
    <>
      <div className="bd-wishlist-area section-space">
        <div className="container">
          {wishlistProducts?.length ? (
            <>
              {" "}
              <div className="row">
                <div className="col-xl-12">
                  <div className="bd-cart-list mb-45">
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="bd-cart-header-product">
                            Product
                          </th>
                          <th className="bd-cart-header-price">Price</th>
                          <th className="bd-cart-header-quantity">Quantity</th>
                          <th>Action</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistProducts?.map((item, index) => {
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
                                    onClick={() => handleIncressWishlist(item)}
                                  >
                                    <PlusIcon />
                                  </span>
                                </div>
                              </td>

                              <td className="bd-cart-add-to-cart">
                                <button
                                  type="submit"
                                  onClick={() => handleAddToCart(item)}
                                  className="bd-primary-btn btn-style is-bg radius-60"
                                >
                                  <span className="bd-primary-btn-text">
                                    Add To Cart
                                  </span>
                                  <span className="bd-primary-btn-circle"></span>
                                </button>
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
                      <div className="col-xl-6 col-md-4">
                        <div className="bd-cart-update">
                          <Link
                            href="/cart"
                            className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                          >
                            <span className="bd-primary-btn-arrow arrow-right">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                            <span className="bd-primary-btn-text">
                              Go To Cart
                            </span>
                            <span className="bd-primary-btn-circle"></span>
                            <span className="bd-primary-btn-arrow arrow-left">
                              <i className="fa-regular fa-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <h3 className="text-center">No Wishlist Product Found</h3>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistArea;
