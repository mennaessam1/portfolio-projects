"use client";
import { blogData } from "@/data/blog-data";
import { imageLoader } from "@/hooks/image-loader";
import RightArrowIcon from "@/svg/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogArea = () => {
  const ArticleOne = blogData.slice(0, 1);
  const ArticleTwo = blogData.slice(1, 3);
  return (
    <>
      <section className="bd-blog-area section-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-12">
              <div className="section-title-space">
                <div className="section-title-wrapper text-center">
                  <span className="section-subtitle mb-10">Our Blog</span>
                  <h2 className="section-title">Blog For Travel Updates</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {ArticleOne &&
              ArticleOne.map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-5 col-xl-6 col-lg-6 col-md-12 col-sm-12"
                >
                  <article className="blog-wrapper blog-default blog-style">
                    <div className="blog-thumb image-hover-effect">
                      <Link href="/blog-details">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="Image"
                        />{" "}
                      </Link>
                    </div>
                    <div className="blog-content">
                      <div className="blog-tag">
                        <span>
                          {" "}
                          <Link href="/blog-list-right">{item.blogTag}</Link>
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
                              {item.author}
                            </Link>
                          </span>
                        </div>
                        <div className="blog-meta-item">
                          <span className="meta-icon">
                            <i className="icon-cleander-check"></i>
                          </span>
                          <span className="meta-text">
                            {" "}
                            <Link href="/blog-details">{item.calender}</Link>
                          </span>
                        </div>
                      </div>
                      <h5 className="blog-title mb-25 underline">
                        {" "}
                        <Link href="/blog-details">{item.detail}</Link>
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
              ))}
            <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-12 col-sm-12">
              <div className="blog-flex">
                {ArticleTwo &&
                  ArticleTwo.slice(0, 3).map((item) => (
                    <article
                      key={item.id}
                      className="blog-wrapper blog-default blog-style-two"
                    >
                      <div className="blog-thumb image-hover-effect">
                        <Link href="/blog-details">
                          <Image
                            src={item.img}
                            loader={imageLoader}
                            style={{ width: "100%", height: "auto" }}
                            alt="Image"
                          />{" "}
                        </Link>
                      </div>
                      <div className="blog-content">
                        <div className="blog-tag">
                          <span>
                            {" "}
                            <Link href="/blog-list-right">{item.blogTag} </Link>
                          </span>
                        </div>
                        <div className="blog-meta-list">
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-person"></i>
                            </span>
                            <span className="meta-text">
                              By{" "}
                              <Link
                                className="meta-author"
                                href="/blog-details"
                              >
                                {item.author}
                              </Link>
                            </span>
                          </div>
                          <div className="blog-meta-item">
                            <span className="meta-icon">
                              <i className="icon-cleander-check"></i>
                            </span>
                            <span className="meta-text">
                              {" "}
                              <Link href="/blog-details">{item.calender}</Link>
                            </span>
                          </div>
                        </div>
                        <h5 className="blog-title mb-30 underline">
                          {" "}
                          <Link href="/blog-details">{item.detail}</Link>
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
                  ))}
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-50">
            <div className="col-lg-2">
              <div className="bd-blog-btn">
                <Link
                  href="/blog-list-right"
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">See All</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArea;
