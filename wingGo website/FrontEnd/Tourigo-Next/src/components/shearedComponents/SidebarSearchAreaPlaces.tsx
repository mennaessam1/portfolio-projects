//SidebarSearchAreaPlaces.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import sideBarBg from "../../../public/assets/images/bg/sidebar-img.png";
import SidebarBookingForm from "@/forms/SidebarBookingForm";
import SidebarBlogList from "./SidebarBlogList";
import SidebarBanner from "./SidebarBanner";
import SidebarSearchInputBox from "./SidebarSearchInputBoxPlaces";

interface PropsType {
  placeHolderTextData: string;
  onSearch: (query: string) => void; // Add an onSearch prop
}

const SidebarSearchArea = ({ placeHolderTextData, onSearch }: PropsType) => {
  return (
    <>
      <aside className="sidebar-wrapper sidebar-sticky">
        <div className="sidebar-widget-wrapper mb-30">
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Search Here</h6>
            <div className="sidebar-search">
            <SidebarSearchInputBox placeHolder={placeHolderTextData} onSearch={onSearch} />
            </div>
          </div>

          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget-banner p-relative">
          <SidebarBanner />
        </div>
        </div>
       
      </aside>
    </>
  );
};

export default SidebarSearchArea;
