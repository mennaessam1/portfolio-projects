"use client";
import TeamElementSix from "@/components/common/teamElement/TeamElementSix";
import { teamData } from "@/data/team-data";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const TeamStyleSix = () => {
  return (
    <>
      <div className="element-team-area section-space-bottom">
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
                      Team Style 06
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text">Team Style 06 Carousel</p>
              </div>
            </div>
          </div>
          <div className="swiper team-activation">
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={4}
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
              }}
              pagination={{
                el: ".bd-pagination",
                clickable: true,
              }}
            >
              {teamData &&
                teamData.slice(3, 8).map((item) => (
                  <SwiperSlide key={item.id}>
                    <TeamElementSix
                      key={item?.id}
                      item={item}
                      isparentClass={false}
                    />
                  </SwiperSlide>
                ))}
              <div className="slider-pagination-wrapper">
                <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamStyleSix;
