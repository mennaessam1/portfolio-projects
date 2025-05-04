"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import sideBarBg from "../../../public/assets/images/bg/sidebar-img.png";
import SidebarBlogList from "./SidebarBlogList";
import SidebarSearchInputBox from "./SidebarSearchInputBox";
interface propsType {
  placeHolderTextData: string;
}

const BlogSidebarSearchArea = ({ placeHolderTextData }: propsType) => {
  return (
    <>
      <aside className="sidebar-wrapper sidebar-sticky">
        <div className="sidebar-widget-wrapper mb-30">
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Search Here</h6>
            <div className="sidebar-search">
              <SidebarSearchInputBox placeHolder={placeHolderTextData} />
            </div>
          </div>
          <div className="sidebar-widget-divider"></div>
          <SidebarBlogList />
        </div>
        <div className="sidebar-widget-banner p-relative">
          <div className="sidebar-widget-thumb p-relative">
            <Image
              src={sideBarBg}
              loader={imageLoader}
              style={{ width: "100%", height: "100%" }}
              alt="img"
            />
          </div>
          <div className="sidebar-widget-content">
            <span className="bd-play-btn pulse-white mb-40">
              <i className="icon-call-ring"></i>
            </span>
            <p className="b3 mb-0">Free Call</p>
            <h5 className="mb-25">
              <Link href="/tel:+0290848020">02 (908) 480-20</Link>
            </h5>
            <div className="sidebar-btn">
              <Link className="bd-text-btn style-two" href="/blog-list-right">
                Contact
                <span className="icon__box">
                  <i className="fa-light fa-angle-right icon__first"></i>
                  <i className="fa-light fa-angle-right icon__second"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BlogSidebarSearchArea;
