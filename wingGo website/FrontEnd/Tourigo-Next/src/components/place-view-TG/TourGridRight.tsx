// TourGridRight.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardPlacesTG";
import { Place } from "@/interFace/interFace";
import { getPlacesData } from "@/data/placeData";
import {fetchAllPlaces} from "@/api/placesApi"

// import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import SidebarSearchArea from "../shearedComponents/SidebarSearchAreaPlaces";

// interface FilterOptions {
//   budget?: number;
//   date?: string;
//   preferences?: string;
//   language?: string;
//   touristId?: string;
// }

const TourGridRight = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRemovePlace = (placeId: string) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
    setFilteredPlaces((prevFiltered) =>
      prevFiltered.filter((place) => place._id !== placeId)
    );
  };
  // Load initial data
// Load initial data
useEffect(() => {
  const loadInitialData = async () => {
    const data = await fetchAllPlaces();
    setPlaces(data);
    setFilteredPlaces(data); // Set the initial filtered list
  };
  loadInitialData();
}, []);

// Update filtered places based on search term
useEffect(() => {
  if (searchTerm) {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = places.filter((place) =>
      place.name.toLowerCase().includes(lowercasedTerm) ||
      place.tagss.some(tag => tag.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredPlaces(results);
  } else {
    setFilteredPlaces(places); // Show all places if there's no search term
  }
}, [searchTerm, places]);

const handleSearch = (query: string) => {
  setSearchTerm(query);
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
                 onRemove={handleRemovePlace} // Pass the handler
               />
                ))}
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
            <SidebarSearchArea placeHolderTextData="Places" onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourGridRight;
