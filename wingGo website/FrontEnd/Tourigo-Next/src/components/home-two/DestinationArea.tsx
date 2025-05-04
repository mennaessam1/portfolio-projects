"use client";
import { destinatoinData } from "@/data/destination-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import DestinationElementTwo from "../common/destinationElement/DestinationElementTwo";

const DestinationArea = () => {
  return (
    <>
      <section className="bd-destination-area section-space p-relative half-bg">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-7">
              <div className="section-title-wrapper">
                <span className="section-subtitle white-text mb-10">
                  Destinations
                </span>
                <h2 className="section-title white-text">
                  Trending Destinations
                </h2>
              </div>
            </div>
            <div className="col-xl-2 col-md-3">
              <div className="destination-btn text-md-end">
                <Link
                  href="/destinations-grid"
                  className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">See all</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="swiper activity-activation">
            <SwiperReact
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={6}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },

                500: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },

                950: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                951: {
                  slidesPerView: 5,
                  spaceBetween: 5,
                },
                1092: {
                  slidesPerView: 6,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 5,
                },
                1400: {
                  slidesPerView: 6,
                  spaceBetween: 5,
                },
              }}
              pagination={{
                el: ".bd-pagination",
                clickable: true,
              }}
            >
              {destinatoinData &&
                destinatoinData.slice(0, 7).map((item) => (
                  <SwiperSlide key={item.id} className="custom-swiper-slide">
                    <DestinationElementTwo item={item} />
                  </SwiperSlide>
                ))}
              <div className="slider-pagination-wrapper">
                <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
              </div>
            </SwiperReact>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
};

export default DestinationArea;
