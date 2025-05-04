"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialData } from "@/data/testimonial-data";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
const TestimonialStyleSeven = () => {
  return (
    <>
      <div className="bd-testimonial-area section-space-bottom fix">
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
                      Testimonial Style 07
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text">Testimonial Style 07 Carousel</p>
              </div>
            </div>
          </div>
          <div className="swiper testimonial-six-active position-relative">
            <div className="swiper-wrapper">
              {/* === */}

              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
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
                  testimonialData.slice(10, 15).map((item) => (
                    <SwiperSlide key={item.id}>
                      <div className="testimonial-wrapper testimonial-style-three">
                        <div className="testimonial-content p-relative">
                          <div className="testimonial-avatar flex-wrap mb-25">
                            <div className="testimonial-avatar-wrap">
                              <div className="avatar-thumb">
                                <Image
                                  src={item?.avatarImg}
                                  alt=""
                                  loader={imageLoader}
                                  style={{ width: "100%", height: "auto" }}
                                />
                              </div>
                              <div className="avatar-meta">
                                <h6 className="avatar-meta-title">
                                  {item?.avatarTitle}
                                </h6>
                                <p>{item?.info}</p>
                              </div>
                            </div>
                            <div className="testimonial-quot-icon">
                              <i className="fa-solid fa-quote-right"></i>
                            </div>
                          </div>
                          <p className="testimonial-desc">
                            {item?.description}
                          </p>
                          <div className="avatar-rating p-relative">
                            <div className="fs-14 d-flex rating-color">
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                <div className="slider-pagination-wrapper mt-50">
                  <div className="slider-pagination bd-pagination justify-content-center"></div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialStyleSeven;
