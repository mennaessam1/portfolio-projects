"use client";
import DestinationElementThree from "@/components/common/destinationElement/DestinationElementThree";
import { destinatoinData } from "@/data/destination-data";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

const DestinationsStyleThree = () => {
  return (
    <>
      <section className="element-Destinations-area section-space-bottom fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center fix">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Destinations Style 03
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="activity-slider-four">
              <SwiperReact
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={6}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  576: {
                    slidesPerView: 2,
                  },

                  768: {
                    slidesPerView: 2,
                  },

                  950: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                  1400: {
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
                  <div className="slider-pagination bd-pagination mt-25 justify-content-center"></div>
                </div>
              </SwiperReact>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationsStyleThree;
