"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import sideBarBg from "../../../public/assets/images/bg/sidebar-img.png";
import SidebarBookingForm from "@/forms/SidebarBookingForm";
import SidebarBlogList from "./SidebarBlogList";
import SidebarSearchInputBox from "./SidebarSearchInputBox";
import SidebarBanner from "./SidebarBanner";

interface propsType {
  placeHolderTextData: string;
}

const SidebarSearchArea = ({ placeHolderTextData }: propsType) => {
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
          <SidebarBanner />
        </div>
      </aside>
    </>
  );
};

export default SidebarSearchArea;
