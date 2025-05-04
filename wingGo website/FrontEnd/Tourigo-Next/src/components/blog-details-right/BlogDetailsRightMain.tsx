import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import BlogDetailsRightArea from "./BlogDetailsRightArea";
import { idType } from "@/interFace/interFace";
const BlogDetailsRightMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb titleOne="Blog Details Right" titleTwo="Blog Details Right" />
      <BlogDetailsRightArea id={id} />
    </>
  );
};

export default BlogDetailsRightMain;
