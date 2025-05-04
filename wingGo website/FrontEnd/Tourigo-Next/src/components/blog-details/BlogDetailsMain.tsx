import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import BlogDetailsArea from "./BlogDetailsArea";
import { idType } from "@/interFace/interFace";
const BlogDetailsMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb titleOne="Blog Details" titleTwo="Blog Details" />
      <BlogDetailsArea id={id} />
    </>
  );
};

export default BlogDetailsMain;
