import React from "react";
import BlogListWrapper from "../shearedComponents/BlogListWrapper";
import BlogSidebarSearchArea from "../shearedComponents/BlogSidebarSearchArea";

const BlogListRight = () => {
  return (
    <>
      <div className="bd-blog-list-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <BlogListWrapper />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <BlogSidebarSearchArea placeHolderTextData="Blog" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListRight;
