"use client";
import React from "react";
import blogImgTwo from "../../../../../public/assets/images/blog/blog-image-2.png";
import blogImgThree from "../../../../../public/assets/images/blog/blog-image-3.png";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import RightArrowIcon from "@/svg/RightArrowIcon";
import Link from "next/link";
const BlogStyleTwo = () => {
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
                      Blog Style Two
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 align-items-center justify-content-center">
            <div className="col-xl-7">
              <article className="blog-wrapper blog-default blog-style-two">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blogImgTwo}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-tag">
                    <span>
                      <Link href="/blog-list-right">Wellness</Link>
                    </span>
                  </div>
                  <div className="blog-meta-list">
                    <div className="blog-meta-item">
                      <span className="meta-icon">
                        <i className="icon-person"></i>
                      </span>
                      <span className="meta-text">
                        By{" "}
                        <Link className="meta-author" href="/blog-details">
                          Will Smith
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
                  <h5 className="blog-title mb-25 underline">
                    <Link href="/blog-details">
                      Mind Matters Navigating Mental Wellness in {`Today's`}{" "}
                      World
                    </Link>
                  </h5>
                  <div className="blog-btn">
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
            <div className="col-xl-7">
              <article className="blog-wrapper blog-default blog-style-two">
                <div className="blog-thumb image-hover-effect">
                  <Link href="/blog-details">
                    <Image
                      src={blogImgThree}
                      alt="img"
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-tag">
                    <span>
                      <Link href="/blog-list-right">Trips</Link>
                    </span>
                  </div>
                  <div className="blog-meta-list">
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
                        <Link href="/blog-details">January 25 2024</Link>
                      </span>
                    </div>
                  </div>
                  <h5 className="blog-title mb-25 underline">
                    <Link href="/blog-details">
                      Roaming Routes Adventures in Every Corner of the World
                    </Link>
                  </h5>
                  <div className="blog-btn">
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

export default BlogStyleTwo;
