"use client";
import DestinationElementFour from "@/components/common/destinationElement/DestinationElementFour";
import { activityData } from "@/data/activity-data";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const DestinationsStyleFour = () => {
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
                      Destinations Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="activity-slider-five">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={3}
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
                    slidesPerView: 3,
                  },
                  1400: {
                    slidesPerView: 3,
                  },
                }}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{
                  el: ".bd-pagination",
                  clickable: true,
                }}
              >
                {activityData &&
                  activityData.slice(9, 14).map((item) => (
                    <SwiperSlide key={item.id} className="custom-swiper-slide">
                      <DestinationElementFour item={item} />
                    </SwiperSlide>
                  ))}
                <div className="slider-pagination-wrapper">
                  <div className="slider-pagination bd-pagination mt-25 justify-content-center"></div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DestinationsStyleFour;
