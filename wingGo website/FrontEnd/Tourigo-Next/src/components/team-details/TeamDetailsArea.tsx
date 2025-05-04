"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { teamData } from "@/data/team-data";
import TeamElementTwo from "../common/teamElement/TeamElementTwo";
const TeamDetailsArea = () => {
  return (
    <>
      <section className="bd-team-area section-space-bottom">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-8 col-sm-9">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our team</span>
                <h2 className="section-title">Tour Guider</h2>
              </div>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-3">
              <div className="team-navigation btn-navigation p-relative style-three d-flex justify-content-md-end">
                <button className="tourigo-navigation-prev">
                  <i className="fa-regular fa-angle-left"></i>
                </button>
                <button className="tourigo-navigation-next">
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="swiper team-activation">
            <Swiper
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
              navigation={{
                nextEl: ".tourigo-navigation-next",
                prevEl: ".tourigo-navigation-prev",
              }}
              modules={[Navigation]}
              className="d-flex overflow-hidden"
            >
              {teamData &&
                teamData.slice(11, 16).map((item) => (
                  <SwiperSlide key={item.id} className="custom-swiper-slide">
                    <TeamElementTwo item={item} isparentClass={false} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamDetailsArea;
