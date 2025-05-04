"use client";
import { blogData } from "@/data/blog-data";
import React from "react";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import BlogSIngleCard from "../common/blogElement/BlogSIngleCard";

const BlogGridArea = () => {
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            {blogData &&
              blogData
                .slice(15, 24)
                .map((item) => (
                  <BlogSIngleCard
                    key={item?.id}
                    item={item}
                    className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
                    blogWrapperClass="blog-wrapper blog-default blog-style-six"
                    isparentClass={true}
                  />
                ))}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BlogGridArea;
