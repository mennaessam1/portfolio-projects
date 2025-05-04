"use client";
import Image from "next/image";
import React from "react";
import { testimonialData } from "@/data/testimonial-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { imageLoader } from "@/hooks/image-loader";
import testiQuoteImg from "../../../../../public/assets/images/testimonial/quot-shape.png";

const TestimonialStyleEight = () => {
  return (
    <>
      <div className="bd-testimonial-area section-space flash-white fix">
        <div className="container">
          <div
            className="row align-items-center justify-content-center wow bdFadeInUp"
            data-wow-delay=".3s"
          >
            <div className="col-lg-12">
              <div className="section-title-wrapper section-title-space text-center">
                <div className="elements-section__wrapper elements-line">
                  <div className="separator__line line-left"></div>
                  <div className="elements-title__wrapper">
                    <h2 className="section__title elements__title">
                      Testimonial Style 08
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="testimonial-style-home-two">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={3}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
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
              {testimonialData &&
                testimonialData.slice(3, 8).map((item) => (
                  <SwiperSlide key={item.id} className="custom-swiper-slide">
                    <div className="testimonial-wrapper testimonial-style-two">
                      <div className="testimonial-content p-relative">
                        <div className="testimonial-avatar flex-wrap">
                          <div className="testimonial-avatar-wrap">
                            <div className="avatar-thumb">
                              <Image
                                src={item.avatarImg}
                                loader={imageLoader}
                                style={{ width: "100%", height: "auto" }}
                                alt=""
                              />
                            </div>
                            <div className="avatar-meta">
                              <h6 className="avatar-meta-title">
                                {item.avatarTitle}
                              </h6>
                              <p>{item.info}</p>
                            </div>
                          </div>
                          <div className="avatar-rating p-relative">
                            <div className="fs-14 d-flex rating-color">
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="testimonial-quot">
                              <Image
                                src={testiQuoteImg}
                                loader={imageLoader}
                                style={{ width: "100%", height: "auto" }}
                                alt="shape"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="testimonial-desc">{item.description}</p>
                      </div>
                    </div>
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

export default TestimonialStyleEight;
