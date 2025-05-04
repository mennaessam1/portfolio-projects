"use client";
import Image from "next/image";
import React from "react";
import bannerMap from "../../../public/assets/images/shapes/banner-map-2.png";
import planeShape from "../../../public/assets/images/shapes/plane-5.png";
import bannerLine from "../../../public/assets/images/shapes/banner-line-4.svg";
import yellowShape from "../../../public/assets/images/shapes/yellow-shape.png";
import bannerImgOne from "../../../public/assets/images/banner/banner-4/img1.png";
import bannerImgTwo from "../../../public/assets/images/banner/banner-4/img2.jpg";
import bannerImgThree from "../../../public/assets/images/banner/banner-4/img3.jpg";
import homeFourBanner from "../../../public/assets/images/shapes/home-4-banner-shape.png";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";

const BannerFour = () => {
  const bannerImgData = [
    {
      id: 1,
      img: bannerImgOne,
    },
    {
      id: 2,
      img: bannerImgTwo,
    },
    {
      id: 3,
      img: bannerImgThree,
    },
  ];
  return (
    <>
      <section className="banner-area banner-padding p-relative fix">
        <div className="banner-four-shape">
          <div className="banner-four-shape-one">
            <Image
              src={bannerMap}
              loader={imageLoader}
              style={{ width: "100%", height: "auto" }}
              alt="shape"
            />
          </div>
          <div className="banner-four-shape-two">
            <Image
              src={planeShape}
              loader={imageLoader}
              style={{ width: "100%", height: "auto" }}
              alt="shape"
            />
          </div>
          <div className="banner-four-shape-three">
            <Image
              src={bannerLine}
              loader={imageLoader}
              style={{ width: "100%", height: "auto" }}
              alt="shape"
            />
          </div>
        </div>

        <div className="banner-wrapper banner-four banner-four-bg p-relative">
          <div
            className="banner-content p-relative wow bdFadeInLeft"
            data-wow-delay=".2s"
          >
            <span
              className="section-subtitle mb-25 wow bdFadeInLeft color-warning"
              data-wow-delay=".3s"
            >
              Welcome WingGo
            </span>
            <h1
              className="banner-title white-text mb-30 wow bdFadeInLeft"
              data-wow-delay=".4s"
            >
              Explore Uncover Hidden Gems{" "}
              <span className="yellow-shape">
                Worldwide{" "}
                <Image
                  src={yellowShape}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="yellow-shape"
                />
              </span>
            </h1>
            <p className="">
              Share the core values and principles that drive your company.
              Emphasize a commitment to costume.
            </p>
        
          </div>
          <div className="banner-slider">
            {/*Swiper*/}
            <div className="swiper banner-four-slider overflow-hidden">
              <div className="swiper-wrapper slider">
                <SwiperReact
                  modules={[Autoplay, Pagination, Mousewheel]}
                  spaceBetween={24}
                  slidesPerView={1}
                  mousewheel={true}
                  direction={"vertical"}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                >
                  {bannerImgData &&
                    bannerImgData.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "100%" }}
                          alt="home"
                        />
                      </SwiperSlide>
                    ))}
                </SwiperReact>
              </div>
              <div className="banner-four-pagination">
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-scroll-bottom">
          <div className="banner-scroll-thumb">
            <Image
              src={homeFourBanner}
              loader={imageLoader}
              style={{ width: "100%", height: "auto" }}
              alt="shape"
            />
          </div>
     
        </div>
      </section>
    </>
  );
};

export default BannerFour;
