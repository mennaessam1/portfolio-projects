"use client";
import Image from "next/image";
import React, { useState } from "react";
import blogVideoPosterImg from "../../../public/assets/images/blog/blog-video-poster.png";
import tourImgNine from "../../../public/assets/images/tour/tour-img-9.png";
import tourImgTen from "../../../public/assets/images/tour/tour-img-10.png";
import tourImgEleven from "../../../public/assets/images/tour/tour-img-11.png";
import { imageLoader } from "@/hooks/image-loader";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import Link from "next/link";
import PaginationWrapperTwo from "./PaginationWrapperTwo";
import ModalVideo from "react-modal-video";
import { blogData } from "@/data/blog-data";
import { useBlogSearch } from "@/hooks/useBlogSearch";

const BlogListWrapper = () => {
  const filterData = blogData?.slice(15, 16);
  const searchData = useBlogSearch();
  const mapData = searchData?.length ? searchData.slice(0, 1) : filterData;
  const sliderData = [
    {
      id: 1,
      img: tourImgNine,
    },
    {
      id: 2,
      img: tourImgTen,
    },
    {
      id: 3,
      img: tourImgEleven,
    },
  ];
  //modal
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);
  return (
    <>
      {mapData?.map((item) => (
        <div key={item?.id}>
          <article className="blog-list-single-wrapper">
            <div className="blog-list-thumb image-hover-effect mb-25">
              <Link href="/blog-grid-right">
                <Image
                  src={item?.img}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="img"
                />
              </Link>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list mb-15">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link className="meta-author" href="blog-details">
                      {item?.author}
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">{item?.calender}</Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">5 Comments</Link>
                  </span>
                </div>
              </div>
              <h4 className="blog-title mb-15 underline">
                <Link href="/blog-details">{item?.detail}</Link>
              </h4>
              <p className="blog-description">{item?.description}</p>
              <div className="blog-btn">
                <Link
                  href="/blog-details"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
          <article className="blog-list-single-wrapper">
            <div className="tour-details-slider details-slide p-relative mb-30">
              <div className="details-slide-activation">
                <SwiperReact
                  modules={[Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".tourigo-navigation-next",
                    prevEl: ".tourigo-navigation-prev",
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                >
                  {sliderData &&
                    sliderData.map((item) => (
                      <SwiperSlide
                        key={item.id}
                        className="custom-swiper-slide"
                      >
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
                        />
                      </SwiperSlide>
                    ))}
                </SwiperReact>
              </div>
              <div className="details-slide-navigation btn-navigation">
                <button className="tourigo-navigation-prev">
                  <i className="fa-regular fa-angle-left"></i>
                </button>
                <button className="tourigo-navigation-next">
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </div>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list mb-15">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link className="meta-author" href="blog-details">
                      David William
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">January 25 2024</Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">5 Comments</Link>
                  </span>
                </div>
              </div>
              <h4 className="blog-title mb-15 underline">
                <Link href="/blog-details">
                  Seaside Serenity: Coastal Getaways for Sun, Sand, and Surf
                </Link>
              </h4>
              <p className="blog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                aut quisquam! Eaque sit cumque iusto non laborum eos, vitae
                dolor sapiente eligendi distinctio explicabo quis facere nulla
                sint sed quisquam aperiam possimus et. Autem, esse.
              </p>
              <div className="blog-btn">
                <Link
                  href="/blog-details"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
          <article className="blog-list-single-wrapper">
            <div className="post-details-blockquote">
              <blockquote>
                <h4 className="blockquote-title">
                  The purpose of the patent system is to foster and encourage
                  new inventions of usefulness.
                </h4>
                <p className="d-flex justify-content-end">
                  <span>Thomas Jefferson</span>
                </p>
              </blockquote>
            </div>
          </article>
          <article className="blog-list-single-wrapper">
            <div className="blog-list-thumb mb-25 blog-postbox-audio">
              <iframe
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/316547873&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              ></iframe>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list mb-15">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link className="meta-author" href="blog-details">
                      David William
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">January 25 2024</Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">5 Comments</Link>
                  </span>
                </div>
              </div>
              <h4 className="blog-title mb-15 underline">
                <Link href="/blog-details">
                  The Ultimate Bucket List: 20 Travel Experiences You {`Can't`}{" "}
                  Miss
                </Link>
              </h4>
              <p className="blog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                aut quisquam! Eaque sit cumque iusto non laborum eos, vitae
                dolor sapiente eligendi distinctio explicabo quis facere nulla
                sint sed quisquam aperiam possimus et. Autem, esse.
              </p>
              <div className="blog-btn">
                <Link
                  href="/blog-details"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
          <article className="blog-list-single-wrapper">
            <div className="post-details-video mb-30">
              <Image
                src={blogVideoPosterImg}
                loader={imageLoader}
                style={{ width: "100%", height: "auto" }}
                alt="image"
              />
              <div className="post-details-video-btn pos-center">
                <button
                  onClick={() => {
                    openVideoModal();
                  }}
                  className="bd-play-btn popup-video animation-three"
                >
                  <i className="icon-play"></i>
                </button>
              </div>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list mb-15">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link className="meta-author" href="blog-details">
                      David William
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">January 25 2024</Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">5 Comments</Link>
                  </span>
                </div>
              </div>
              <h4 className="blog-title mb-15 underline">
                <Link href="/blog-details">
                  Indulge Your Senses: A Culinary Tour Around the Globe
                </Link>
              </h4>
              <p className="blog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                aut quisquam! Eaque sit cumque iusto non laborum eos, vitae
                dolor sapiente eligendi distinctio explicabo quis facere nulla
                sint sed quisquam aperiam possimus et. Autem, esse.
              </p>
              <div className="blog-btn">
                <Link
                  href="/blog-details"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
          <article className="blog-list-single-wrapper">
            <div className="blog-content">
              <div className="blog-meta-list mb-15">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link className="meta-author" href="blog-details">
                      David William
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">January 25 2024</Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href="/blog-details">5 Comments</Link>
                  </span>
                </div>
              </div>
              <h4 className="blog-title mb-15 underline">
                <Link href="/blog-details">
                  Empowering Journeys for the Independent Traveler
                </Link>
              </h4>
              <p className="blog-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
                aut quisquam! Eaque sit cumque iusto non laborum eos, vitae
                dolor sapiente eligendi distinctio explicabo quis facere nulla
                sint sed quisquam aperiam possimus et. Autem, esse.
              </p>
              <div className="blog-btn">
                <Link
                  href="/blog-details"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="eUpwDAnkgSM"
            onClose={() => setIsOpen(false)}
          />
        </div>
      ))}
    </>
  );
};

export default BlogListWrapper;
