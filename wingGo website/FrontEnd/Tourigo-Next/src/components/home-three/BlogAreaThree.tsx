"use client";
import { blogData } from "@/data/blog-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogAreaThree = () => {
  return (
    <>
      <section className="bd-blog-area section-space fix">
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
            {blogData &&
              blogData.slice(7, 9).map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12"
                >
                  <article className="blog-wrapper blog-style-four p-relative">
                    <div className="blog-thumb image-hover-effect">
                      <Link href="/blog-details">
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "100%" }}
                          alt="Image"
                        />
                      </Link>
                    </div>
                    <div className="blog-content">
                      <div className="blog-tag">
                        <span>
                          <Link href="/@@blogLink">{item.blogTag}</Link>
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
                              {item.author}
                            </Link>
                          </span>
                        </div>
                        <div className="blog-meta-item">
                          <span className="meta-icon">
                            <i className="icon-cleander-check"></i>
                          </span>
                          <span className="meta-text">
                            <Link href="/blog-details">{item.calender}</Link>
                          </span>
                        </div>
                      </div>
                      <h5 className="blog-title mb-15 underline">
                        <Link href="/blog-details">{item.detail}</Link>
                      </h5>
                      <p className="mb-30">{item.description}</p>
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
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogAreaThree;
