"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import brand1 from "../../../../../public/assets/images/brand/brand-img-1.png";
import brand2 from "../../../../../public/assets/images/brand/brand-img-2.png";
import brand3 from "../../../../../public/assets/images/brand/brand-img-3.png";
import Image from "next/image";

const BrandStyleTwo = () => {
  const brandSliderData = [
    {
      id: 1,
      img: brand1,
    },
    {
      id: 2,
      img: brand2,
    },
    {
      id: 3,
      img: brand3,
    },
    {
      id: 4,
      img: brand2,
    },
    {
      id: 5,
      img: brand1,
    },
    {
      id: 6,
      img: brand2,
    },
    {
      id: 7,
      img: brand3,
    },
  ];

  return (
    <>
      <div className="element-brand-area section-space-bottom fix">
        <div className="brand-inner">
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
                        Brand Style 02
                      </h2>
                    </div>
                    <div className="separator__line line-right"></div>
                  </div>
                  <p className="muted-text"></p>
                </div>
              </div>
            </div>
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
                        <div className="brand-item text-center">
                          <div className="brand-thumb">
                            <Image src={item?.img} alt="image" />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandStyleTwo;
