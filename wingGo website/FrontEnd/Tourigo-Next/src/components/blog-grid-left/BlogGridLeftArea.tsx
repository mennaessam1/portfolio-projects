import React from "react";
import BlogGridWrapper from "../shearedComponents/BlogGridWrapper";
import BlogSidebarSearchArea from "../shearedComponents/BlogSidebarSearchArea";

const BlogGridLeftArea = () => {
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 order-md-0 order-1">
              <BlogSidebarSearchArea placeHolderTextData="Blog" />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-6 order-md-1 order-0">
              <BlogGridWrapper />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGridLeftArea;
