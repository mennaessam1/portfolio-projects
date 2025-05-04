import React, { useState } from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBoxIt";
import RangeFilter from "./RangeFilter";

interface ItinerariesSidebarMainProps {
    applyFilters: (filters: { budget?: number; category?: string }) => void;
    applySearch: (query: string) => void;
}

const ItinerariesSidebarMain: React.FC<ItinerariesSidebarMainProps> = ({ applyFilters, applySearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handlePriceChange = (range: number[]) => {
        applyFilters({ budget: range[1] });
    };

    const handleCategoryChange = (category: string) => {
        applyFilters({ category });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        applySearch(query);
    };

    return (
        <aside className="sidebar-wrapper sidebar-sticky">
            <div className="sidebar-widget-wrapper mb-30">
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Search Transports by City</h6>
                    <div className="sidebar-search">
                        <SidebarSearchInputBox placeHolder="City" onSearch={handleSearch} />
                    </div>
                </div>
                {/* <div className="sidebar-widget-divider"></div>
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Price Filter</h6>
                    <RangeFilter onChange={handlePriceChange} />
                </div> */}
                <div className="sidebar-widget-divider"></div>
                <div className="sidebar-widget widget widget_categories">
                    <h6 className="sidebar-widget-title small mb-15">Type of Transport</h6>
                    <SidebarCategories onCategorySelect={handleCategoryChange} />
                </div>
            </div>
        </aside>
    );
};

export default ItinerariesSidebarMain;
