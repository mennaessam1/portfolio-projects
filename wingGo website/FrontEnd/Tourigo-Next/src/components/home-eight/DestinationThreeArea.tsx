"use client";
import { destinatoinData } from "@/data/destination-data";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import DestinationElementThree from "../common/destinationElement/DestinationElementThree";
const DestinationThreeArea = () => {
  return (
    <>
      <section className="bd-activity-area section-space fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Destinations</span>
                <h2 className="section-title">Trending Destinations</h2>
              </div>
            </div>
            <div className="col-xl-2 col-md-3">
              <div className="bd-activity-btn text-md-end">
                <Link
                  href="/destinations-grid-right"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">See All</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="activity-slider-four">
              <SwiperReact
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={5}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  1600: {
                    slidesPerView: 5,
                  },
                }}
                pagination={{
                  el: ".bd-pagination",
                  clickable: true,
                }}
              >
                {destinatoinData &&
                  destinatoinData.slice(7, 15).map((item) => (
                    <SwiperSlide key={item.id} className="custom-swiper-slide">
                      <DestinationElementThree item={item} />
                    </SwiperSlide>
                  ))}
                <div className="slider-pagination-wrapper">
                  <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
                </div>
              </SwiperReact>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationThreeArea;
