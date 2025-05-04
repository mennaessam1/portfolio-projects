"use client";
import React from "react";
import blog17 from "../../../../../public/assets/images/blog/blog-image-17.png";
import blog18 from "../../../../../public/assets/images/blog/blog-image-18.png";
import blog19 from "../../../../../public/assets/images/blog/blog-image-18.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import RightArrowIcon from "@/svg/RightArrowIcon";
import Link from "next/link";
const BlogStyleSeven = () => {
  return (
    <>
      <section className="element-blog-area section-space-bottom fix">
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
                      Blog Style Seven
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div
              className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <article className="blog-wrapper blog-default blog-style-six">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blog17}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-meta-list">
                    <div className="blog-meta-item has-seperator">
                      <span className="meta-icon">
                        <i className="icon-profile"></i>
                      </span>
                      <span className="meta-text">
                        <Link className="meta-author" href="/blog-details">
                          David William
                        </Link>
                      </span>
                    </div>
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-cleander-check"></i>
                      </span>
                      <span className="meta-text">
                        <Link href="/blog-details">February 25 2024</Link>
                      </span>
                    </div>
                  </div>
                  <h5 className="blog-title mb-15 underline">
                    <Link href="/blog-details">
                      Passage Perspectives: Discovering Cultures Through Travel
                    </Link>
                  </h5>
                  <div className="">
                    <div className="icon-text-btn p-relative">
                      <Link href="/blog-details">
                        <span>Read More</span>
                        <i>
                          <RightArrowIcon />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div
              className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <article className="blog-wrapper blog-default blog-style-six">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blog18}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-meta-list">
                    <div className="blog-meta-item has-seperator">
                      <span className="meta-icon">
                        <i className="icon-profile"></i>
                      </span>
                      <span className="meta-text">
                        <Link className="meta-author" href="/blog-details">
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
                  </div>
                  <h5 className="blog-title mb-15 underline">
                    <Link href="/blog-details">
                      {`Trekker's Tales: Navigating the World's Wonders`}
                    </Link>
                  </h5>
                  <div className="">
                    <div className="icon-text-btn p-relative">
                      <Link href="/blog-details">
                        <span>Read More</span>
                        <i>
                          <RightArrowIcon />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div
              className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <article className="blog-wrapper blog-default blog-style-six">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blog19}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-meta-list">
                    <div className="blog-meta-item has-seperator">
                      <span className="meta-icon">
                        <i className="icon-profile"></i>
                      </span>
                      <span className="meta-text">
                        <Link className="meta-author" href="/blog-details">
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
                  </div>
                  <h5 className="blog-title mb-15 underline">
                    <Link href="/blog-details">
                      Excursion Express: Fast-Track to Your Dream Destinations
                    </Link>
                  </h5>
                  <div className="">
                    <div className="icon-text-btn p-relative">
                      <Link href="/blog-details">
                        <span>Read More</span>
                        <i>
                          <RightArrowIcon />
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogStyleSeven;
