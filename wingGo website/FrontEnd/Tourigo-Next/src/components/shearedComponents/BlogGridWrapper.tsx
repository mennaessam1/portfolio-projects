"use client";
import React from "react";
import { blogData } from "@/data/blog-data";

import PaginationWrapperTwo from "./PaginationWrapperTwo";
import BlogSIngleCard from "../common/blogElement/BlogSIngleCard";
import { useBlogSearch } from "@/hooks/useBlogSearch";

const BlogGridWrapper = () => {
  const filterData = blogData?.slice(15, 23);
  const searchData = useBlogSearch();
  const mapData = searchData?.length ? searchData : filterData;
  return (
    <>
      <div className="row gy-24">
        {mapData &&
          mapData.map((item) => (
            <BlogSIngleCard
              key={item?.id}
              item={item}
              className="col-xl-6 col-md-6 col-lg-6 col-md-12"
              blogWrapperClass="blog-wrapper blog-default blog-style-six"
              isparentClass={true}
            />
          ))}
      </div>
    </>
  );
};

export default BlogGridWrapper;
