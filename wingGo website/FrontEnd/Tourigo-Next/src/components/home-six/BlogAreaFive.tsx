"use client";
import { blogData } from "@/data/blog-data";
import { imageLoader } from "@/hooks/image-loader";
import RightArrowIcon from "@/svg/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogAreaFive = () => {
  return (
    <>
      <section className="bd-blog-area section-space fix">
        <div className="container">
          <div className="row gy-24 align-items-center justify-content-center section-title-space">
            <div className="col-xl-6 col-md-8">
              <div className="section-title-wrapper text-center">
                <span className="section-subtitle mb-10">Our Blog</span>
                <h2 className="section-title">Blog For Travel Updates</h2>
              </div>
            </div>
          </div>
          <div className="row gy-24">
            {blogData &&
              blogData.slice(12, 15).map((item) => (
                <div
                  key={item.id}
                  className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 wow bdFadeInUp"
                  data-wow-delay=".3s"
                >
                  <article className="blog-wrapper blog-default blog-style-six">
                    <div className="blog-thumb image-hover-effect">
                      <Link href={`/blog-details/${item?.id}`}>
                        <Image
                          src={item.img}
                          loader={imageLoader}
                          style={{ width: "100%", height: "auto" }}
                          alt="image"
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
                            <Link
                              className="meta-author"
                              href={`/blog-details/${item?.id}`}
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
                            <Link href={`/blog-details/${item?.id}`}>
                              {item.calender}
                            </Link>
                          </span>
                        </div>
                      </div>
                      <h5 className="blog-title mb-5 underline">
                        <Link href={`/blog-details/${item?.id}`}>
                          {item?.detail}
                        </Link>
                      </h5>
                      <p>{item.description}</p>
                      <div className="">
                        <div className="icon-text-btn p-relative">
                          <Link href={`/blog-details/${item?.id}`}>
                            <span>Read More </span>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogAreaFive;
