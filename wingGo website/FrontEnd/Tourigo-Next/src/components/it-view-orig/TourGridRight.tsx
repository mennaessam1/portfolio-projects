// TourGridRight.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import { Itinerary } from "@/interFace/interFace";
import { getItinerariesData, getFilteredItinerariesData } from "@/data/it-data";
import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import ItinerariesSidebarMain from "../itinerariesSidebar/ItinerariesSidebarMain";
import { filterItineraries } from "@/api/itineraryApi";

interface FilterOptions {
  budget?: number;
  date?: string;
  preferences?: string;
  language?: string;
 

}

const TourGridRight = () => {
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");

  // Fetch filtered activities from the API
  const loadFilteredItineraries = async () => {
    try {
      const apiFilters: FilterOptions = {
        budget: filters.budget,
        preferences: filters.preferences,
        date: filters.date,
        language: filters.language,
        
      };

      const data = await filterItineraries(apiFilters);

      // Apply local search filtering if searchQuery is provided
    const finalFilteredData = searchQuery
      ? data.filter(
          (itinerary) =>
            itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Match name
            itinerary.tags.some((tag: string) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()) // Match tags
            )
        )
        : data;

      // Apply sorting after fetching and filtering
      const sortedData = sortData(finalFilteredData, sortOption);
      setFilteredItineraries(sortedData);
    } catch (error) {
      console.error("Failed to fetch filtered itineraries:", error);
    }
  };

  // Load filtered activities whenever filters, searchQuery, or sortOption change
  useEffect(() => {
    loadFilteredItineraries();
  }, [filters, searchQuery, sortOption]);

  const sortData = (data: Itinerary[], option: string): Itinerary[] => {
    let sortedData = [...data]; // Copy the array to avoid mutating the original data

    switch (option) {
      case "Rating: High to Low":
        sortedData.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case "Rating: Low to High":
        sortedData.sort((a, b) => (a.averageRating || 0) - (b.averageRating || 0));
        break;
      case "Price: Low to High":
        sortedData.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "Price: High to Low":
        sortedData.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "Default":
      default:
        // No sorting; return data as is
        break;
    }

    return sortedData;
  };

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Update filters with new values
    }));
  };

  const applySearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (selectedOption: string) => {
    setSortOption(selectedOption); // Update the current sorting option
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
                  />
                ))}
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
            <ItinerariesSidebarMain applyFilters={applyFilters} applySearch={applySearch} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourGridRight;
