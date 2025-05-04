"use client";
import { teamData } from "@/data/team-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TeamElementTwo from "../common/teamElement/TeamElementTwo";

const TeamAreaThree = () => {
  return (
    <>
      <section className="bd-team-area section-space flash-white fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-6 col-md-8 col-sm-7">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our team</span>
                <h2 className="section-title">Tour Guider</h2>
              </div>
            </div>
            <div className="col-xl-3 col-md-3 col-sm-5">
              <div className="team-navigation btn-navigation p-relative style-three team-text-end">
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
              modules={[Navigation, Pagination]}
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
              pagination={{
                el: ".bd-pagination",
                clickable: true,
              }}
            >
              {teamData &&
                teamData.slice(3, 8).map((item) => (
                  <SwiperSlide key={item.id} className="custom-swiper-slide">
                    <TeamElementTwo item={item} isparentClass={false} />
                  </SwiperSlide>
                ))}
              <div className="slider-pagination-wrapper">
                <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamAreaThree;
