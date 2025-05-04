import React, { useState, useEffect } from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarBanner from "./SidebarBanner";
import SidebarProduct from "./SidebarProduct";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBoxIt";
import RangeFilter from "./RangeFilter";

interface ProductsSidebarMainProps {
  applyFilters: (filters: { budget?: number; }) => void;
  applySearch: (query: string) => void;  // New prop for search functionality
}


const ShopSidebarMain: React.FC<ProductsSidebarMainProps> = ({ applyFilters, applySearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
      
  
      const handlePriceChange = (range: number[]) => {
          applyFilters({ budget: range[1] });
      };
  
      const handleSearch = (query: string) => {
          setSearchQuery(query);
          applySearch(query);
      };
  return (
    <>
      <aside className="sidebar-wrapper sidebar-sticky">
        <div className="sidebar-widget-wrapper mb-30">
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Search Products</h6>
            <div className="sidebar-search">
              <SidebarSearchInputBox placeHolder="Products" onSearch={handleSearch} />
            </div>
          </div>
          <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Price Filter</h6>
            <RangeFilter onChange={handlePriceChange}/>
          </div>
          {/* <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">Best Sell</h6>
            <SidebarProduct />
          </div> */}
          {/* <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget widget_categories">
            <h6 className="sidebar-widget-title small mb-15">Categories</h6>
            <SidebarCategories />
          </div> */}
          {/* <div className="sidebar-widget-divider"></div>
          <div className="sidebar-widget widget widget_tag_cloud">
            <h6 className="sidebar-widget-title small mb-15">Popular Tags</h6>
            <SidebarTags />
          </div> */}
        </div>
        <div className="sidebar-widget-banner p-relative">
          <SidebarBanner />
        </div>
      </aside>
    </>
  );
};

export default ShopSidebarMain;
