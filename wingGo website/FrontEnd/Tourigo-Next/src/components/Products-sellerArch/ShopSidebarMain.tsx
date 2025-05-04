import React from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarBanner from "./SidebarBanner";
import SidebarProduct from "./SidebarProduct";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBox";
import RangeFilter from "./RangeFilter";

const ShopSidebarMain = () => {
  return (
    <>
      <aside className="sidebar-wrapper sidebar-sticky">
        <div className="sidebar-widget-wrapper mb-30">
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Search Here</h6>
            <div className="sidebar-search">
              <SidebarSearchInputBox placeHolder="Products" />
            </div>
          </div>
          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Price Filter</h6>
            <RangeFilter />
          </div>
          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Best Sell</h6>
            <SidebarProduct />
          </div>
          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget widget_categories">
            <h6 className="sidebar-widget-title small mb-15">Categories</h6>
            <SidebarCategories />
          </div>
          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget widget_tag_cloud">
            <h6 className="sidebar-widget-title small mb-15">Popular Tags</h6>
            <SidebarTags />
          </div>
        </div>
        <div className="sidebar-widget-banner p-relative">
          <SidebarBanner />
        </div>
      </aside>
    </>
  );
};

export default ShopSidebarMain;
