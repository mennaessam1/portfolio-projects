import React from "react";
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import BlogDetailsLeftArea from "./BlogDetailsLeftArea";
import { idType } from "@/interFace/interFace";

const BlogDetailsLeftMain = ({ id }: idType) => {
  return (
    <>
      <Breadcrumb titleOne="Blog Details Left" titleTwo="Blog Details Left" />
      <BlogDetailsLeftArea id={id} />
    </>
  );
};

export default BlogDetailsLeftMain;
