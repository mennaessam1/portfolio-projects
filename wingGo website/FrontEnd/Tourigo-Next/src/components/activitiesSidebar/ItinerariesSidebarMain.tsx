import React, { useState,useEffect } from "react";
import SidebarCategories from "./SidebarCategories";
import SidebarTags from "./SidebarTags";
import SidebarSearchInputBox from "../shearedComponents/SidebarSearchInputBoxIt";
import RangeFilter from "./RangeFilter";
import RatingFilter from "./RatingFilter";
import DatePicker from "react-datepicker";
import {fetchCategories} from "@/api/activityApi"

interface ItinerariesSidebarMainProps {
    applyFilters: (filters: { budget?: number; category?: string; date?: string ; averageRating?:number}) => void;
    applySearch: (query: string) => void;
}

const ItinerariesSidebarMain: React.FC<ItinerariesSidebarMainProps> = ({ applyFilters, applySearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

    // Fetch Categories on Component Mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories); // Update state with fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false); // Ensure loading is set to false
      }
    };
    loadCategories();
  }, []);

    const handlePriceChange = (range: number[]) => {
        applyFilters({ budget: range[1] });
    };

    // const handleCategoryChange = (category: string) => {
    //     applyFilters({ category });
    // };

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
    const handleRatingChange = (range: number[]) => {
        applyFilters({ averageRating: range[0] }); // Only send the minimum rating (range[0])
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
    
        // Apply the selected language to filters
        applyFilters({ category: selectedValue || undefined }); // Clear the filter if "All Languages" is selected
      };

    return (
        <aside className="sidebar-wrapper sidebar-sticky">
            <div className="sidebar-widget-wrapper mb-30">
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Search Activities</h6>
                    <div className="sidebar-search">
                        <SidebarSearchInputBox placeHolder="Search Itineraries" onSearch={handleSearch} />
                    </div>
                </div>
                <div className="sidebar-widget-divider"></div>
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Price Filter</h6>
                    <RangeFilter onChange={handlePriceChange} />
                </div>
                <div className="sidebar-widget-divider"></div>
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Rating Filter</h6>
                    <RatingFilter onChange={handleRatingChange} />
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
                    <SidebarCategories onCategorySelect={handleCategoryChange} />
                </div> */}
                <div className="sidebar-widget-divider"></div>
                {/* Language Filter */}
                <div className="sidebar-widget widget">
                    <h6 className="sidebar-widget-title small mb-15">Category Filter</h6>
                    <select
                      className="sidebar-select"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
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
                      <option value="">All Categories</option>
                      {loadingCategories ? (
                        <option disabled>Loading...</option>
                      ) : categories.length > 0 ? (
                        categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))
                      ) : (
                        <option disabled>No Categories Found</option>
                      )}
                    </select>
                  </div>
                </div>
              </aside>
    );
};

export default ItinerariesSidebarMain;
