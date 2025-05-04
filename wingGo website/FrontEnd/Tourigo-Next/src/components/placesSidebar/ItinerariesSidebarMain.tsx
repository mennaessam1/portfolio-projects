// ItinerariesSidebarMain.tsx
import React, { useState, useEffect } from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBoxIt";
import RangeFilter from "./RangeFilter";
import DatePicker from "react-datepicker";
import { fetchDistinctTags } from "@/api/placesApi";


interface ItinerariesSidebarMainProps {
    applyFilters: (filters: { tag?: string; }) => void;
    applySearch: (query: string) => void;  // New prop for search functionality
  }

  
    const ItinerariesSidebarMain: React.FC<ItinerariesSidebarMainProps> = ({ applyFilters, applySearch }) => {

        const [searchQuery, setSearchQuery] = useState<string>("");
        const [selectedTag, setSelectedTag] = useState<string>("");
        const [tags, setTags] = useState<string[]>([]); // State to hold distinct tags
      
        useEffect(() => {
          const loadTags = async () => {
            try {
              const distinctTags = await fetchDistinctTags(); // Fetch tags using API
              setTags(distinctTags); // Update state with fetched tags
            } catch (error: any) {
              console.error("Failed to fetch distinct tags:", error.message);
            }
          };
      
          loadTags(); // Call the function to load tags
        }, []);
      
  
      
  
      const handleSearch = (query: string) => {
          setSearchQuery(query);
          applySearch(query);
      };

      
      const handleTagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedTag(selectedValue);
        console.log(selectedValue);
    
        // Apply the selected language to filters
        applyFilters({ tag: selectedValue || undefined }); // Clear the filter if "All Languages" is selected
      };
      

  return (
    <aside className="sidebar-wrapper sidebar-sticky">
      <div className="sidebar-widget-wrapper mb-30">
        <div className="sidebar-widget widget">
          <h6 className="sidebar-widget-title small mb-15">Search Places</h6>
          <div className="sidebar-search">
          <SidebarSearchInputBox placeHolder="Search Itineraries" onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="sidebar-widget-divider"></div>
                {/* Language Filter */}
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Tags Filter</h6>
                    <select
        className="sidebar-select"
        value={selectedTag}
        onChange={handleTagsChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ced4da",
          fontSize: "16px",
          color: "#495057",
          backgroundColor: "#fff",
          marginBottom: "15px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999999' d='M2 0L0 2h4zM2 5L0 3h4z'/></svg>")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "10px",
        }}
        >
          <option value="">All Tags</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        </div>
                
        {/* <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget widget_categories">
          <h6 className="sidebar-widget-title small mb-15">Categories</h6>
          <SidebarCategories />
        </div> */}
        
      </div>
    </aside>
  );
};

export default ItinerariesSidebarMain;
