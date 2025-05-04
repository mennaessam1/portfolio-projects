"use client";
import React from "react";
import { destinatoinData } from "@/data/destination-data";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import DestinationElementTwo from "@/components/common/destinationElement/DestinationElementTwo";
const DestinationsStyleTwo = () => {
  return (
    <>
      <section className="element-Destinations-area section-space-bottom">
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
                      Destinations Style 02
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
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
    </>
  );
};

export default DestinationsStyleTwo;
