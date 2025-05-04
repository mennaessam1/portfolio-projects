"use client";
import React from "react";
import blogTen from "../../../../../public/assets/images/blog/blog-image-10.png";
import blogEleven from "../../../../../public/assets/images/blog/blog-image-11.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import Link from "next/link";
const BlogStyleFive = () => {
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
                      Blog Style Five
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <article className="blog-wrapper blog-style-four p-relative">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blogTen}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-tag">
                    <span>
                      <Link href="@@blogLink">Travel</Link>
                    </span>
                  </div>
                  <div className="blog-meta-list mb-10">
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-person"></i>
                      </span>
                      <span className="meta-text">
                        By{" "}
                        <Link className="meta-author" href="/blog-details">
                          Sophia Miller
                        </Link>
                      </span>
                    </div>
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-cleander-check"></i>
                      </span>
                      <span className="meta-text">
                        <Link href="/blog-details">Feb 05 2024</Link>
                      </span>
                    </div>
                  </div>
                  <h5 className="blog-title mb-15 underline">
                    <Link href="/blog-details">
                      {`Trekker's Tales: Navigating the World's Wonders `}
                    </Link>
                  </h5>
                  <p className="mb-30">
                    Adventure tales, tips, and guides to ignite your wanderlust
                    and inspire your next unforgettable journey.
                  </p>
                  <div className="blog-btn">
                    <Link
                      href="/blog-detail"
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
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <article className="blog-wrapper blog-style-four p-relative">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blogEleven}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-tag">
                    <span>
                      <Link href="@@blogLink">Travel</Link>
                    </span>
                  </div>
                  <div className="blog-meta-list mb-10">
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-person"></i>
                      </span>
                      <span className="meta-text">
                        By{" "}
                        <Link className="meta-author" href="/blog-details">
                          Sophia Miller
                        </Link>
                      </span>
                    </div>
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-cleander-check"></i>
                      </span>
                      <span className="meta-text">
                        <Link href="/blog-details">Feb 05 2024</Link>
                      </span>
                    </div>
                  </div>
                  <h5 className="blog-title mb-15 underline">
                    <Link href="/blog-details">
                      Journey Journals: Tales from the Road Less Traveled
                    </Link>
                  </h5>
                  <p className="mb-30">
                    Embark on a journey of a lifetime with our captivating
                    travel tales, inspiring wanderlust and igniting your
                    passion.
                  </p>
                  <div className="blog-btn">
                    <Link
                      href="/blog-detail"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogStyleFive;
