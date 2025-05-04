"use client";
import Image from "next/image";
import React from "react";
import { testimonialData } from "@/data/testimonial-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { imageLoader } from "@/hooks/image-loader";
import testiQuoteImg from "../../../public/assets/images/testimonial/quot-shape.png";

const TestimonialAreaTwo = () => {
  return (
    <>
      <section className="bd-testimonial-area testimonial-space section-space-top flash-white p-relative">
        <div className="container">
          <div className="row gy-24 align-items-center text-center justify-content-center section-title-space">
            <div className="col-xl-6">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Testimonials</span>
                <h2 className="section-title">Customers Feedback</h2>
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
      </section>
    </>
  );
};

export default TestimonialAreaTwo;
