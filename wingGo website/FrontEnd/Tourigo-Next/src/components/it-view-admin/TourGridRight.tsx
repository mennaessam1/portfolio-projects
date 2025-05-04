// TourGridRight.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardItAdmin";
import { Itinerary } from "@/interFace/interFace";
import { getAdminItinerariesData  } from "@/data/it-data";  // Remove filtered API call as we're only using initial data
import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import ItinerariesSidebarMain from "../itinerariesSidebar/ItinerariesSidebarMainAdmin";

interface FilterOptions {
  budgetMin?: number;
  budgetMax?: number;
  language?: string;
}

const TourGridRightAdmin = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState<string>("Default"); // Track the last sort option
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await getAdminItinerariesData();
      setItineraries(data);
      setFilteredItineraries(data); // Initialize with full data
    };
    loadInitialData();
  }, []);

  const sortData = (data: Itinerary[], option: string) => {
    let sortedData = [...data];
    if (option === "Rating: High to Low") {
      sortedData.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (option === "Rating: Low to High") {
      sortedData.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
    }
    return sortedData;
  };

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  
    let filteredData = itineraries.filter((itinerary) => {
      let matches = true;
  
      // Check if both min and max price filters are defined
      if (newFilters.budgetMin !== undefined) matches = matches && itinerary.price >= newFilters.budgetMin;
      if (newFilters.budgetMax !== undefined) matches = matches && itinerary.price <= newFilters.budgetMax;
  
      // Additional filters (e.g., language)
      if (newFilters.language) matches = matches && itinerary.language === newFilters.language;
      
      return matches;
    });
  
    // Reapply sorting after filtering
    filteredData = sortData(filteredData, sortOption);
    setFilteredItineraries(filteredData);
  };

  // Apply search locally
  const applySearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const searchedData = filteredItineraries.filter((itinerary) =>
        itinerary.title.toLowerCase().includes(query.toLowerCase()) ||
        itinerary.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredItineraries(searchedData);
    } else {
      applyFilters(filters);  // Re-apply filters if search query is cleared
    }
  };

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption);
    const sortedData = sortData(filteredItineraries, selectedOption);
    setFilteredItineraries(sortedData);
  };

  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
            <ItinerariesContentHeader
              itineraryCount={filteredItineraries.length}
              onSortChange={handleSortChange}
              />
              <div className="row gy-24">
                {filteredItineraries.map((item) => (
                  <TourSingleCard
                    tour={item}
                    key={item._id}
                    className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                    tourWrapperClass="tour-wrapper style-one"
                    isparentClass={true}
                    isAdmin={true} // Set isAdmin to true for admin view
                  />
                ))}
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
            <ItinerariesSidebarMain applyFilters={applyFilters} applySearch={applySearch}  />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourGridRightAdmin;
