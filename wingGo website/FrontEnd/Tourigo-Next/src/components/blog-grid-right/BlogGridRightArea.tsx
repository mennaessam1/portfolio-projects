import React from "react";
import BlogGridWrapper from "../shearedComponents/BlogGridWrapper";
import BlogSidebarSearchArea from "../shearedComponents/BlogSidebarSearchArea";

const BlogGridRightArea = () => {
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-6">
              <BlogGridWrapper />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6">
              <BlogSidebarSearchArea placeHolderTextData="Blog" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGridRightArea;
