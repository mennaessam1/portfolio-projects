"use client";
import products_data from "@/data/product-data";
import { idType, ProductsType } from "@/interFace/interFace";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ShopContentSingleCard from "@/elements/shop/ShopContentSingleCard";

const RelatedProduct = ({ id }: idType) => {
  const item = products_data?.find((itm) => itm?.id == id) as ProductsType;
  const mapData = products_data?.filter((itm) => itm?.id !== item?.id);
  return (
    <>
      <div className="row gy-24 align-items-center justify-content-between section-title-space">
        <div className="col-xl-6 col-md-8 col-sm-9">
          <div className="section-title-wrapper">
            <h2 className="section-title">Related Tour Package</h2>
          </div>
        </div>
        <div className="col-xl-3 col-md-3 col-sm-3">
          <div className="package-navigation btn-navigation p-relative style-three d-flex justify-content-md-end">
            <button className="tourigo-navigation-prev">
              <i className="fa-regular fa-angle-left"></i>
            </button>
            <button className="tourigo-navigation-next">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xxl-12">
          <div className="swiper package-activation">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 3000,
              }}
              loop={true}
              navigation={{
                nextEl: ".tourigo-navigation-next",
                prevEl: ".tourigo-navigation-prev",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                550: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {mapData?.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <ShopContentSingleCard classItem="" item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
