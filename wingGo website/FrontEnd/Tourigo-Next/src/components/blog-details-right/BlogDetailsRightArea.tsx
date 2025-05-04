import React from "react";
import BlogDetailsWrapper from "../shearedComponents/BlogDetailsWrapper";
import { idType } from "@/interFace/interFace";
import BlogSidebarSearchArea from "../shearedComponents/BlogSidebarSearchArea";
const BlogDetailsRightArea = ({ id }: idType) => {
  return (
    <>
      <section className="bd-blog-details-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <BlogDetailsWrapper id={id} />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <BlogSidebarSearchArea placeHolderTextData="Blog" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsRightArea;
