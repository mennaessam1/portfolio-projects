"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { idType, ProductsType } from "@/interFace/interFace";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import products_data from "@/data/product-data";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cart_product, decrease_quantity } from "@/redux/slices/cartSlice";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";

const ProductDetailsSection = ({ id }: idType) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  //   =====

  const dispatch = useDispatch();
  const item = products_data?.find((itm) => itm.id == id) as ProductsType;

  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const quantity = cartProducts.find((itm) => itm?.id === item?.id);
  const totalCart = quantity?.totalCart ? quantity?.totalCart : 0;

  const handleAddToCart = (item: ProductsType) => {
    dispatch(cart_product(item));
  };

  const img = item?.image;
  // ====

  const shopProducts = [
    {
      id: 1,
      imgData: img,
    },
    {
      id: 2,
      imgData: "/assets/images/shop/shop-details-img-2.png",
    },
    {
      id: 3,
      imgData: "/assets/images/shop/shop-details-img-3.png",
    },
    {
      id: 4,
      imgData: "/assets/images/shop/shop-details-img-4.png",
    },
    {
      id: 5,
      imgData: "/assets/images/shop/shop-details-img-5.png",
    },
    {
      id: 6,
      imgData: "/assets/images/shop/shop-details-img-6.png",
    },
    {
      id: 7,
      imgData: "/assets/images/shop/shop-details-img-1.png",
    },
    {
      id: 8,
      imgData: "/assets/images/shop/shop-details-img-2.png",
    },
    {
      id: 9,
      imgData: "/assets/images/shop/shop-details-img-3.png",
    },
    {
      id: 10,
      imgData: "/assets/images/shop/shop-details-img-4.png",
    },
    {
      id: 11,
      imgData: "/assets/images/shop/shop-details-img-5.png",
    },
    {
      id: 12,
      imgData: "/assets/images/shop/shop-details-img-6.png",
    },
  ];

  return (
    <>
      <div className="row gy-24 justify-content-between">
        <div className="col-xxl-6 col-xl-6 col-lg-6">
          <div className="product-details-thumb-wrap">
            <div className="product-details-thumb-top mb-24">
              <div className="swiper-container product-details-active p-relative">
                <div className="swiper-wrapper">
                  <Swiper
                    thumbs={{ swiper: thumbsSwiper }}
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    freeMode={false}
                    watchSlidesProgress={true}
                    modules={[Navigation, Controller, FreeMode, Thumbs]}
                    navigation={{
                      nextEl: ".product-details-button-next",
                      prevEl: ".product-details-button-prev",
                    }}
                  >
                    {shopProducts.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="swiper-slides">
                          <div className="product-details-thumb">
                            <Image
                              src={item.imgData}
                              loader={imageLoader}
                              alt="product-details-img"
                              width={577}
                              height={577}
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="product-details-nav-button">
                    <div className="product-details-button-prev">
                      <i className="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className="product-details-button-next">
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-details-thumb-bottom">
              <div className="product-details-slider-dot">
                <div className="swiper product-details-nav">
                  <div className="swiper-wrapper">
                    <Swiper
                      onSwiper={(swiper) => setThumbsSwiper(swiper)}
                      loop={true}
                      spaceBetween={0}
                      slidesPerView={6}
                      modules={[Controller, FreeMode, Thumbs]}
                      watchSlidesProgress={false}
                    >
                      {shopProducts.map((item, index) => (
                        <SwiperSlide key={index}>
                          <button className="custom-button">
                            <Image
                              src={item.imgData}
                              loader={imageLoader}
                              alt="product-details-img"
                              width={70}
                              height={70}
                              style={{
                                width: "100%",
                                height: "auto",
                              }}
                            />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {item?.id && (
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="product-details-wrapper">
              <h2 className="product-details-title small mb-10">
                {item?.title}
              </h2>
              <div className="product-details-rating d-flex align-items-center mb-15">
                <div className="product-rating rating-color d-flex">
                  <i className="icon-star"></i>
                  <i className="icon-star"></i>
                  <i className="icon-star"></i>
                  <i className="icon-star"></i>
                  <i className="icon-star"></i>
                </div>
                <div className="product-details-rating-count ml-10">
                  <span>(15 review)</span>
                </div>
              </div>
              <p className="mb-15">
                Tourigo Short Sleeve T-shirts offer a perfect blend of style,
                comfort, and durability. Crafted with high-quality materials,
                these T-shirts are designed to elevate your casual wardrobe.
                Whether {`you're`} exploring the outdoors or enjoying a
                laid-back day in the city, Tourigo T-shirts are your go-to
                choice for effortless fashion.
              </p>
              <div className="product-details-price mb-10">
                <h4 className="product-details-ammount">${item?.price}</h4>
              </div>
              <div className="product-details-info mb-10">
                <p>Size:</p>
                <span>XXL (US)</span>
              </div>
              <div className="product-details-categories mb-10">
                <div className="widget_tag_cloud d-flex flex-wrap align-items-center gap-10">
                  <h6 className="sidebar-widget-title small">Categories:</h6>
                  <div className="tagcloud">
                    <Link href={`/blog-details`}>T-shirt</Link>
                    <Link href={`/blog-details`}>Polo</Link>
                    <Link href={`/blog-details`}>Tour</Link>
                    <Link href={`/blog-details`}>Tourism</Link>
                  </div>
                </div>
              </div>
              <div className="product-details-tags d-flex align-items-center gap-10 mb-10">
                <p>Color:</p>
                <div className="product-details-variation-list">
                  <button
                    type="button"
                    className="color color-variation-btn"
                    style={{ backgroundColor: "#F8B655" }}
                  >
                    <span className="color-variation-tooltip">Yellow</span>
                  </button>
                  <button
                    type="button"
                    className="color color-variation-btn active"
                    style={{ backgroundColor: "#CBCBCB" }}
                  >
                    <span className="color-variation-tooltip">Gray</span>
                  </button>
                  <button
                    type="button"
                    className="color color-variation-btn"
                    style={{ backgroundColor: "#FF0000" }}
                  >
                    <span className="color-variation-tooltip">Red</span>
                  </button>
                  <button
                    type="button"
                    className="color color-variation-btn"
                    style={{ backgroundColor: "#494E52" }}
                  >
                    <span className="color-variation-tooltip">Black</span>
                  </button>
                  <button
                    type="button"
                    className="color color-variation-btn"
                    style={{ backgroundColor: "#B4505A" }}
                  >
                    <span className="color-variation-tooltip">Brown</span>
                  </button>
                </div>
              </div>
              <div className="product-details-id mb-25">
                <p>Product ID:</p>
                <span className="underline">
                  <Link href="#">VC-101</Link>
                </span>
              </div>

              <div className="product-details-count-wrap d-flex flex-wrap gap-10 align-items-center">
                <div className="product-details-quantity">
                  <div className="bd-product-quantity">
                    <span
                      onClick={() => dispatch(decrease_quantity(item))}
                      className="bd-cart-minus"
                    >
                      <i className="fa-sharp fa-regular fa-minus"></i>
                    </span>
                    <input
                      className="bd-cart-input"
                      type="text"
                      readOnly
                      value={quantity?.quantity ? quantity?.quantity : 0}
                    />
                    <span
                      onClick={() => handleAddToCart(item)}
                      className="bd-cart-plus"
                    >
                      <i className="fa-sharp fa-regular fa-plus"></i>
                    </span>
                  </div>
                </div>
                <div className="product-details-action d-flex flex-wrap align-items-center ml-15">
                  <Link
                    href="/cart"
                    className="bd-primary-btn btn-style radius-60"
                  >
                    <span className="bd-primary-btn-text">Add to Cart</span>
                    <span className="bd-primary-btn-circle"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailsSection;
