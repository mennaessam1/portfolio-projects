// TourGridRightTourGuide.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardItGuide";
import { Itinerary } from "@/interFace/interFace";
import { getTourGuideItinerariesData } from "@/data/it-data";
import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import ItinerariesSidebarMain from "../itinerariesSidebar/ItinerariesSidebarMain";

interface FilterOptions {
  budgetMin?: number;
  budgetMax?: number;
  language?: string;
}

const TourGridRightTourGuide = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState<string>("Default"); // Track the last sort option
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const data = await getTourGuideItinerariesData();
      setItineraries(data);
      setFilteredItineraries(data); // Initialize with full data
    };
    loadInitialData();
  }, []);
  const removeItinerary = (id: string) => {
    // Update the original list of itineraries
    setItineraries((prevItineraries) =>
      prevItineraries.filter((itinerary) => itinerary._id !== id)
    );
  
    // Update the filtered list of itineraries
    setFilteredItineraries((prevFilteredItineraries) =>
      prevFilteredItineraries.filter((itinerary) => itinerary._id !== id)
    );
  };
  // Apply filters locally
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
      applyFilters(filters); // Re-apply filters if search query is cleared
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
  {filteredItineraries.map((item) => (
    <TourSingleCard
      tour={item}
      key={item._id}
      className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
      tourWrapperClass="tour-wrapper style-one"
      isparentClass={true}
      isTourGuide={true}
      removeItinerary={removeItinerary} // Pass the removeItinerary callback
    />
  ))}
</div>
        </div>
       
      </section>
    </>
  );
};

export default TourGridRightTourGuide;
