"use client";
import { activityData } from "@/data/activity-data";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DestinationElementFour from "../common/destinationElement/DestinationElementFour";
const PopularActivities = () => {
  return (
    <>
      <section className="bd-activity-area section-space flash-white fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Activities</span>
                <h2 className="section-title">Popular Things To Do</h2>
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
                  <div className="slider-pagination bd-pagination mt-60 justify-content-center"></div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularActivities;
