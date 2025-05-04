"use client";
import React from "react";
import { blogData } from "@/data/blog-data";
import BlogSIngleCardThree from "@/components/common/blogElement/BlogSIngleCardThree";
const BlogStyleThree = () => {
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
                      Blog Style Three
                    </h2>
                  </div>
                  <div className="separator__line line-right"></div>
                </div>
                <p className="muted-text"></p>
              </div>
            </div>
          </div>
          <div className="row gy-24 align-items-center">
            {blogData?.slice(0, 3)?.map((item) => (
              <BlogSIngleCardThree
                key={item?.id}
                item={item}
                isparentClass={true}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogStyleThree;
