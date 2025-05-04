"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import brand7 from "../../../../../public/assets/images/brand/brand-07.png";
import brand8 from "../../../../../public/assets/images/brand/brand-08.png";
import brand9 from "../../../../../public/assets/images/brand/brand-09.png";
import brand10 from "../../../../../public/assets/images/brand/brand-10.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
const BrandStyleThree = () => {
  const brandSliderData = [
    {
      id: 1,
      img: brand7,
    },
    {
      id: 2,
      img: brand8,
    },
    {
      id: 3,
      img: brand9,
    },
    {
      id: 4,
      img: brand10,
    },
    {
      id: 5,
      img: brand7,
    },
    {
      id: 6,
      img: brand8,
    },
    {
      id: 7,
      img: brand9,
    },
    {
      id: 8,
      img: brand7,
    },
    {
      id: 9,
      img: brand8,
    },
    {
      id: 10,
      img: brand9,
    },
    {
      id: 11,
      img: brand10,
    },
    {
      id: 12,
      img: brand7,
    },
    {
      id: 13,
      img: brand8,
    },
    {
      id: 14,
      img: brand9,
    },
  ];

  return (
    <>
      <section className="element-brand-area section-space-bottom fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Brand Style 03
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="theme-bg-secondary pt-50 pb-50">
          <div
            className="brand-wrapper brand-style-two wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="swiper brand-active">
              <div className="swiper-wrapper">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={6}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    500: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 4,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                    1200: {
                      slidesPerView: 4,
                    },
                    1400: {
                      slidesPerView: 6,
                    },
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                >
                  {brandSliderData &&
                    brandSliderData.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div className="brand-item">
                          <Image
                            src={item?.img}
                            alt="image"
                            loader={imageLoader}
                            style={{ width: "auto", height: "auto" }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandStyleThree;
