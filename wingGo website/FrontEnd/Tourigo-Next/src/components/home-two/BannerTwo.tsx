"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import yellowShape from "../../../public/assets/images/shapes/yellow-shape.png";
import { imageLoader } from "@/hooks/image-loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { sliderData } from "@/data/homeTwo/slider-home-two-data";
import SearchFilterTwo from "../shearedComponents/SearchFilterTwo";
const BannerTwo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.navigation) {
      swiperRef.current.navigation.update();
    }
  }, [activeIndex]);
  return (
    <>
      <section className="bd-banner-area banner-style-two banner-slider-mask">
        <div className="banner-booking-two">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-8 col-xl-10 col-lg-11">
                <div
                  className="banner-search-wrapper style-two wow bdFadeIn"
                  data-wow-delay="1.2s"
                >
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper banner-two-active p-relative">
          <div className="swiper-wrapper">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Navigation]}
              effect={"fade"}
              onSlideChange={handleSlideChange}
              navigation={{
                nextEl: ".banner-navigation-next",
                prevEl: ".banner-navigation-prev",
              }}
              autoplay={{
                delay: 3000,
              }}
              loop={true}
            >
              {sliderData?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="swiper-slide">
                    <div className="banner-slider-wrapper">
                      <div
                        className="banner-two-image"
                        style={{ backgroundImage: `url(${item.bgImg.src})` }}
                      ></div>
                      <div className="container">
                        <div className="row justify-content-center">
                          <div className="col-xxl-9 col-xl-9 col-lg-10">
                            <div className="banner-two-content">
                              <h1 className="banner-title medium fw-7 mb-20 white-text">
                                {item.tagOne}{" "}
                                <span className="yellow-shape">
                                  {item.tagTwo}{" "}
                                  <Image
                                    src={yellowShape}
                                    loader={imageLoader}
                                    style={{ width: "100%", height: "auto" }}
                                    alt="yellow-shape"
                                  />
                                </span>
                                {item.tagThree}
                              </h1>
                              <p className="banner-description mb-20">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* navigation button start */}
          <div className="banner-nav-btn d-none d-md-block">
            <div className="banner-navigation-btn-2">
              <button className="banner-navigation-prev">
                <i className="fa-regular fa-angle-left"></i>
              </button>
              <button className="banner-navigation-next">
                <i className="fa-regular fa-angle-right"></i>
              </button>
            </div>
          </div>
          {/* navigation button end */}
        </div>
      </section>
    </>
  );
};

export default BannerTwo;
