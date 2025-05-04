"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialData } from "@/data/testimonial-data";
import { imageLoader } from "@/hooks/image-loader";
import GetRatting from "@/hooks/GetRatting";

const TestimonialAreaFive = () => {
  return (
    <>
      <section className="bd-testimonial-area section-space-bottom testimonial-space-top p-relative fix flash-white">
        <div className="container">
          <div className="row gy-24 justify-content-between">
            <div className="col-xxl-5 col-xl-5 col-lg-5">
              <div className="section-title-wrapper mb-35">
                <span className="section-subtitle mb-10">Testimonials</span>
                <h2 className="section-title mb-15">
                  Voices of Travelers Testimonials and Reviews
                </h2>
            
              </div>
         
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="testimonial-five">
                <div className="swiper testimonial-five-active position-relative">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
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
                              <div className="testimonial-wrapper testimonial-style-five">
                                <div className="testimonial-content p-relative">
                                  <div className="avatar-rating mb-25">
                                    <div className="fs-14 d-flex rating-color">
                                      {item?.rating && (
                                        <GetRatting
                                          averageRating={item?.rating}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <p className="testimonial-description">
                                    {item.description}
                                  </p>
                                  <div className="testimonial-quotation">
                                    <i className="fa-sharp fa-solid fa-quote-left"></i>
                                  </div>
                                </div>
                                <div className="testimonial-avatar-wrap">
                                
                                  <div className="avatar-meta">
                                    <h6 className="avatar-meta-title">
                                      {item.avatarTitle}
                                    </h6>
                                    <p>{item.info}</p>
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
      </section>
    </>
  );
};

export default TestimonialAreaFive;
