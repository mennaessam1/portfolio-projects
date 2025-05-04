// ItinerariesSidebarMain.tsx
import React, { useState, useEffect } from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBoxIt";
import RangeFilter from "./RangeFilter";
import DatePicker from "react-datepicker";


interface ItinerariesSidebarMainProps {
    applyFilters: (filters: { budget?: number;  preferences?: string; date?: string; language?: string }) => void;
    applySearch: (query: string) => void;  // New prop for search functionality
  }

  
    const ItinerariesSidebarMain: React.FC<ItinerariesSidebarMainProps> = ({ applyFilters, applySearch }) => {
      const [searchQuery, setSearchQuery] = useState<string>("");
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);
      const [selectedLanguage, setSelectedLanguage] = useState<string>("");
      const [isPreferencesActive, setIsPreferencesActive] = useState<boolean>(false); // Track preferences state

  
      const handlePriceChange = (range: number[]) => {
          applyFilters({ budget: range[1] });
      };
  
      const handleSearch = (query: string) => {
          setSearchQuery(query);
          applySearch(query);
      };

      const handleDateChange = (date: Date | null) => {
          setSelectedDate(date);
  
          // Apply the selected date to filters in 'YYYY-MM-DD' format
          if (date) {
              const formattedDate = date.toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
              applyFilters({ date: formattedDate });
          } else {
              applyFilters({ date: undefined }); // Clear the date filter if no date is selected
          }
      };
      const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedLanguage(selectedValue);
    
        // Apply the selected language to filters
        applyFilters({ language: selectedValue || undefined }); // Clear the filter if "All Languages" is selected
      };
      const handleTagFilter = () => {
        const newPreferencesState = !isPreferencesActive;
        setIsPreferencesActive(newPreferencesState); // Toggle the button state
        applyFilters({ preferences: newPreferencesState ? "true" : "false" }); // Update preferences filter
      };

  return (
    <aside className="sidebar-wrapper sidebar-sticky">
      <div className="sidebar-widget-wrapper mb-30">
        <div className="sidebar-widget widget">
          <h6 className="sidebar-widget-title small mb-15">Search Itineraries</h6>
          <div className="sidebar-search">
          <SidebarSearchInputBox placeHolder="Search Itineraries" onSearch={handleSearch} />
          </div>
        </div>
        <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget">
          <h6 className="sidebar-widget-title small mb-15">Price Filter</h6>
          <RangeFilter  onChange={handlePriceChange} />
        </div>
        <div className="sidebar-widget-divider"></div>
                {/* Language Filter */}
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Language Filter</h6>
                    <select
                      className="sidebar-select"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
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
                      <option value="">All Languages</option>
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="French">French</option>
                      {/* Add more languages as needed */}
                    </select>
                </div>
                <div className="sidebar-widget-divider"></div>
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Date Filter</h6>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        className="form-control"
                        isClearable
                        showPopperArrow={false}
                    />
                </div>
        {/* <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget widget_categories">
          <h6 className="sidebar-widget-title small mb-15">Categories</h6>
          <SidebarCategories />
        </div> */}
        <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget widget_tag_cloud">
          {/* <h6 className="sidebar-widget-title small mb-15">Popular Tags</h6> */}
          <button
            className="bd-primary-btn btn-style radius-60 mb-10"
            onClick={handleTagFilter}
            style={{
              cursor: "pointer",
              margin: "0 auto", // Center horizontally
              display: "block", // Ensure block-level behavior
              textAlign: "center", // Align the text inside
            }}
          >
            {isPreferencesActive ? "Unfilter" : "Filter by Preference Tags"}
         </button>
          {/* <SidebarTags /> */}
        </div>
      </div>
    </aside>
  );
};

export default ItinerariesSidebarMain;
