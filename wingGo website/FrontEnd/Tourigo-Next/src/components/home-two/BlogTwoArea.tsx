"use client";
import { blogData } from "@/data/blog-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import BlogSIngleCardThree from "../common/blogElement/BlogSIngleCardThree";

const BlogTwoArea = () => {
  return (
    <>
      <section className="bd-blog-area section-space">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-between section-title-space">
            <div className="col-xl-8 col-lg-8">
              <div className="section-title-wrapper">
                <span className="section-subtitle mb-10">Our Blog</span>
                <h2 className="section-title">Blog For Travel Updates</h2>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="blog-btn text-md-end">
                <Link
                  href="/blog-list"
                  className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">See More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="blog_activation">
            <SwiperReact
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={3}
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
                1200: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              pagination={{
                el: ".blog-slider-pagination",
                clickable: true,
              }}
            >
              {blogData &&
                blogData.slice(3, 7).map((item) => (
                  <SwiperSlide key={item.id} className="custom-swiper-slide">
                    <BlogSIngleCardThree
                      key={item?.id}
                      item={item}
                      isparentClass={false}
                    />
                  </SwiperSlide>
                ))}
            </SwiperReact>
          </div>
          <div className="blog-slider-pagination bd-pagination mt-20 justify-content-center"></div>
        </div>
      </section>
    </>
  );
};

export default BlogTwoArea;
