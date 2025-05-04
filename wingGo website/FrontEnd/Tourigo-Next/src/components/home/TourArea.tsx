"use client";
import { tourData } from "@/data/tour-data";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourArea = () => {
  return (
    <>
      <section className="bd-tour-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-lg-6 col-md-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Trips</span>
                <h2 className="section-title">Feature Packages</h2>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="bd-tour-btn text-md-end">
                <Link
                  href="/tour-grid-right"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">More Packages</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="tour-slide-wrapper p-relative">
            <div className="tour__active">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={4}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  767: {
                    slidesPerView: 1,
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
                {tourData &&
                  tourData.slice(0, 6).map((item) => (
                    <SwiperSlide key={item.id} className="custom-swiper-slide">
                      <TourSingleCard
                        tour={item}
                        className=""
                        tourWrapperClass="tour-wrapper style-one"
                        isparentClass={false}
                      />
                    </SwiperSlide>
                  ))}
                <div className="slider-pagination-wrapper">
                  <div className="slider-pagination bd-pagination mt-50 justify-content-center"></div>
                </div>
              </Swiper>
            </div>
            <div className="tour-navigation btn-navigation d-none d-xxl-block">
              <button className="tourigo-navigation-prev">
                <i className="fa-regular fa-angle-left"></i>
              </button>
              <button className="tourigo-navigation-next">
                <i className="fa-regular fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourArea;
