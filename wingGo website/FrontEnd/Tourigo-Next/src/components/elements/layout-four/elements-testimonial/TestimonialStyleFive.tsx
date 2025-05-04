"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialData } from "@/data/testimonial-data";
import { imageLoader } from "@/hooks/image-loader";

const TestimonialStyleFive = () => {
  return (
    <>
      <div className="bd-testimonial-area section-space theme-bg-light fix">
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
                      Testimonial Style 05
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 justify-content-between">
            <div className="col-xxl-5 col-xl-5 col-lg-5">
              <div className="section-title-wrapper mb-35">
                <span className="section-subtitle mb-10">Testimonials</span>
                <h2 className="section-title mb-15">
                  Voices of Travelers Testimonials and Reviews
                </h2>
                <p className="">
                  Lorem ipsum dolor sit amet consectetur. Facilisis in neque
                  curabitur tristique placerat sit turpis.
                </p>
              </div>
              <div className="travel-btn">
                <Link
                  href="#"
                  className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Know More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="testimonial-five">
                <div className="swiper testimonial-five-active position-relative">
                  <div className="swiper-wrapper">
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
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
                        testimonialData.slice(15, 19).map((item) => (
                          <SwiperSlide
                            key={item.id}
                            className="custom-swiper-slide"
                          >
                            <div className="swiper-slide">
                              <div className="testimonial-wrapper testimonial-style-five">
                                <div className="testimonial-content p-relative mb-25">
                                  <div className="avatar-rating mb-25">
                                    <div className="fs-14 d-flex rating-color">
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                      <i className="fa-solid fa-star"></i>
                                    </div>
                                  </div>
                                  <p className="testimonial-description">
                                    {item?.description}
                                  </p>
                                  <div className="testimonial-quotation">
                                    <i className="fa-sharp fa-solid fa-quote-left"></i>
                                  </div>
                                </div>
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
                                      {item?.avatarTitle}
                                    </h6>
                                    <p>{item?.info}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      <div className="slider-pagination-wrapper testimonial-five-pagination">
                        <div className="slider-pagination bd-pagination justify-content-center"></div>
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialStyleFive;
