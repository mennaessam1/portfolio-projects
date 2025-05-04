"use client";
import React from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import TourSingleCardTwo from "@/components/common/tourElements/TourSingleCardTwo";
import { tourData } from "@/data/tour-data";
import BookingFormModal from "@/elements/modals/BookingFormModal";
const TourStyleFour = () => {
  return (
    <>
      <section className="element-Tour-area section-space-bottom">
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
                      Tour Style 04
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tour-slide-wrapper p-relative">
                <div className="swiper tour-four-active">
                  <div className="swiper-wrapper">
                    <SwiperReact
                      modules={[Navigation]}
                      spaceBetween={24}
                      slidesPerView={3}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      navigation={{
                        nextEl: ".tourigo-navigation-next",
                        prevEl: ".tourigo-navigation-prev",
                      }}
                      className="d-flex overflow-hidden custom-swiper"
                    >
                      {tourData &&
                        tourData.slice(20, 26).map((item) => (
                          <SwiperSlide
                            key={item.id}
                            className="custom-swiper-slide"
                          >
                            <TourSingleCardTwo
                              tour={item}
                              className=""
                              tourWrapperClass="tour-wrapper style-four"
                              isparentClass={false}
                            />
                          </SwiperSlide>
                        ))}
                    </SwiperReact>
                  </div>
                </div>
                <div className="tour-navigation btn-navigation">
                  <button className="tourigo-navigation-prev">
                    <i className="fa-regular fa-angle-left"></i>
                  </button>
                  <button className="tourigo-navigation-next">
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourStyleFour;
