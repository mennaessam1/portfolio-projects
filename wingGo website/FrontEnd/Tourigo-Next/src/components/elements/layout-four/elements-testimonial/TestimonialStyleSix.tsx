"use client";
import React from "react";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { testimonialData } from "@/data/testimonial-data";
const TestimonialStyleSix = () => {
  return (
    <>
      <div className="bd-testimonial-area section-space fix">
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
                      Testimonial Style 06
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 justify-content-between">
            {testimonialData &&
              testimonialData.slice(8, 11).map((item) => (
                <div key={item?.id} className="col-xxl-4 col-xl-4 col-lg-4">
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
                      <p className="testimonial-desc">{item?.description}</p>
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialStyleSix;
