"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import productTwo from "../../../public/assets/images/shop/shop-img-4.png";
import productThere from "../../../public/assets/images/shop/shop-img-5.png";
import productFour from "../../../public/assets/images/shop/shop-img-6.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGlobalContext from "@/hooks/use-context";
import { Product } from "@/interFace/interFace";
import { useDispatch } from "react-redux";
import { cart_product, decrease_quantity } from "@/redux/slices/cartSliceproduct";
import GetRatting from "@/hooks/GetRatting";

const ShopModal = () => {
  const { modalData } = useGlobalContext();
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const myData = cartProducts.find((item) => item.id === modalData.id);
  const handleAddToCart = (product: Product) => {
    dispatch(cart_product(product));
  };
  const handleDecressCart = (product: Product) => {
    dispatch(decrease_quantity(product));
  };

  return (
    <>
      <div
        className="modal fade"
        id="productModalId"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered product__modal"
          role="document"
        >
          <div className="modal-content">
            <div className="product__modal-wrapper p-relative">
              <div className="product__modal-close p-absolute">
                <button data-bs-dismiss="modal">
                  <i className="fal fa-times"></i>
                </button>
              </div>
              <div className="product__modal-inner">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    {/* modal box */}
                    <div className="product__modal-box">
                      <div className="tab-content" id="modalTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav1"
                          role="tabpanel"
                          aria-labelledby="nav1-tab"
                        >
                          <div className="product__modal-img w-img">
                            {modalData?.image && (
                              <Image
                                src={modalData?.image}
                                style={{ width: "auto", height: "auto" }}
                                alt="product"
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav2"
                          role="tabpanel"
                          aria-labelledby="nav2-tab"
                        >
                          <div className="product__modal-img w-img">
                            <Image
                              src={productTwo}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav3"
                          role="tabpanel"
                          aria-labelledby="nav3-tab"
                        >
                          <div className="product__modal-img w-img">
                            <Image
                              src={productThere}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav4"
                          role="tabpanel"
                          aria-labelledby="nav4-tab"
                        >
                          <div className="product__modal-img w-img">
                            <Image
                              src={productFour}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs" id="modalTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="nav1-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav1"
                            type="button"
                            role="tab"
                            aria-controls="nav1"
                            aria-selected="true"
                          >
                            {modalData?.image && (
                              <Image
                                src={modalData?.image}
                                style={{ width: "100%", height: "auto" }}
                                alt="product"
                              />
                            )}
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="nav2-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav2"
                            type="button"
                            role="tab"
                            aria-controls="nav2"
                            aria-selected="false"
                          >
                            <Image
                              src={productTwo}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="nav3-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav3"
                            type="button"
                            role="tab"
                            aria-controls="nav3"
                            aria-selected="false"
                          >
                            <Image
                              src={productThere}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="nav4-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav4"
                            type="button"
                            role="tab"
                            aria-controls="nav4"
                            aria-selected="false"
                          >
                            <Image
                              src={productFour}
                              style={{ width: "100%", height: "auto" }}
                              alt="product"
                            />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    {/* modal content */}
                    <div className="product__modal-content">
                      <h4>
                        <Link href={`/shop-details/${modalData?.id}`}>
                          {modalData?.title}
                        </Link>
                      </h4>
                      <div className="product__modal-des mb-20">
                        <p>
                          Typi non habent claritatem insitam, est usus legentis
                          in iis qui facit eorum claritatem. Investigationes
                          demonstraverunt
                        </p>
                      </div>
                      <div className="product__stock">
                        <span>Availability :</span>
                        <span>In Stock</span>
                      </div>
                      <div className="product__stock sku mb-15">
                        <span>SKU:</span>
                        <span>Juicera C49J89: £875, Debenhams Plus</span>
                      </div>
                      <div className="product__review d-sm-flex">
                        <div className="rating rating__shop mb-15 mr-35">
                          <div className="product-rating">
                            {modalData.rating && (
                              <GetRatting averageRating={modalData?.rating} />
                            )}
                          </div>
                        </div>
                        <div className="product__add-review">
                          <span>
                            <Link href="shop-details">
                              {modalData?.rating} Rating
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="product-price mb-15">
                        {`$${modalData?.price}.00`}{" "}
                        {modalData?.discount ? (
                          <span className="product-discount-price">{`$${modalData.discount}.00`}</span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="product__modal-form">
                        <div className="product-quantity-cart mb-30">
                          <div className="product-quantity-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                              <button
                                className="cart-minus"
                                onClick={() => handleDecressCart(modalData)}
                              >
                                <i className="far fa-minus"></i>
                              </button>
                              <input
                                className="cart-input m-0"
                                readOnly
                                value={myData?.quantity || 0}
                              />
                              <button
                                className="cart-plus"
                                onClick={() => handleAddToCart(modalData)}
                              >
                                <i className="far fa-plus"></i>
                              </button>
                            </form>
                          </div>
                          <div data-bs-dismiss="modal">
                            <Link
                              href="/cart"
                              className="tourigo-productAdd-btn"
                              data-bs-dismiss="modal"
                            >
                              View Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="product__modal-links">
                        <ul>
                          <li data-bs-dismiss="modal">
                            <Link href="#" title="Add to Wishlist">
                              <i className="fal fa-heart"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Compare">
                              <i className="far fa-sliders-h"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Print">
                              <i className="fal fa-print"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#" title="Share">
                              <i className="fal fa-share-alt"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopModal;
