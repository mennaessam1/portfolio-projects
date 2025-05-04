// TourGridRight.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardPlaces";
import { Place } from "@/interFace/interFace";
import { getPlacesData } from "@/data/placeData";
// import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import SidebarSearchArea from "../shearedComponents/SidebarSearchAreaPlaces";
import PlacesSidebar from "../placesSidebar/ItinerariesSidebarMain";
import { filterPlaces } from "@/api/placesApi";

interface FilterOptions {
  
  tag?: string;
  

}

const TourGridRight = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Default");

  // Fetch filtered activities from the API
  const loadFilteredPlaces = async () => {
    try {
      const apiFilters: FilterOptions = {
       
        tag: filters.tag,
        
      };

      const data = await filterPlaces(apiFilters);

      // Apply local search filtering if searchQuery is provided
    const finalFilteredData = searchQuery
      ? data.filter(
          (place) =>
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Match name
            place.tagss.some((tag: string) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()) // Match tags
            )
        )
        : data;

      
        setFilteredPlaces(finalFilteredData);
        console.log(finalFilteredData);
    } catch (error) {
      console.error("Failed to fetch filtered itineraries:", error);
    }
  };

  // Load filtered activities whenever filters, searchQuery, or sortOption change
  useEffect(() => {
    loadFilteredPlaces();
  }, [filters, searchQuery]);

  

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Update filters with new values
    }));
  };

  const applySearch = (query: string) => {
    setSearchQuery(query);
  };



  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              {/* <ItinerariesContentHeader /> */}
              <div className="row gy-24">
                {filteredPlaces.map((item) => (
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
            <PlacesSidebar
          applyFilters={applyFilters}
          applySearch={applySearch}
        />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourGridRight;
