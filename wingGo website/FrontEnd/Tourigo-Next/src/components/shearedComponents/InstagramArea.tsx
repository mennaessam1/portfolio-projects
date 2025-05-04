"use client";
import { instagramData } from "@/data/homeFour/instagram-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

interface propsClass {
  ptClass?: string;
}

const InstagramArea = ({ ptClass }: propsClass) => {
  return (
    <>
      <div className={`bd-instagram-area pb-50 fix ${ptClass ? ptClass : ""}`}>
        <div className="swiper instagram-slide-activation">
          <SwiperReact
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 6,
              },
            }}
            mousewheel={true}
            navigation={{
              nextEl: ".tourigo-navigation-next",
              prevEl: ".tourigo-navigation-prev",
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            centeredSlides={true}
            pagination={{
              el: ".bd-pagination",
              clickable: true,
            }}
          >
            {instagramData &&
              instagramData.map((item) => (
                <SwiperSlide key={item.id} className="custom-swiper-slide">
                  <div className="instagram-image">
                    <Image
                      src={item.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "auto" }}
                      alt="image"
                    />
                    <div className="instagram-icon">
                      <Link href="/https://www.instagram.com/" target="_blank">
                        <i className="icon-instagram"></i>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </SwiperReact>
        </div>
      </div>
    </>
  );
};

export default InstagramArea;
