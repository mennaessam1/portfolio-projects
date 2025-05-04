// TourGridRight.tsx
"use client";
import React, { useEffect, useState } from "react";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import TourSingleCard2 from "../common/tourElements/ActivitySingleCard";
import { Itinerary,Activity } from "@/interFace/interFace";
import { getItinerariesData, getFilteredItinerariesData } from "@/data/it-data";
import ItinerariesContentHeader from "@/elements/itineraries/it-header";
import ItinerariesSidebarMain from "../itinerariesSidebar/ItinerariesSidebarMain";
import { viewAllSavedEventsApi } from "@/api/itineraryApi";
import { it } from "node:test";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from "sonner";


interface DecodedToken {
  username: string;
  id: string; // Use 'id' instead of 'userId'
  role: string;
  mustChangePassword: boolean;
//   iat: number; // Add this if included in the token payload
}



const SavedEventsGrid = () => {
  const [savedActivities, setSavedActivities] = useState<Activity[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);
  const [touristId, setTouristId] = useState<string>("");

  const removeUnsavedItinerary = (itineraryId: string) => {
    setSavedItineraries((prev) => prev.filter((itinerary) => itinerary._id !== itineraryId));
  };
  
  const removeUnsavedActivity = (activityId: string) => {
    setSavedActivities((prev) => prev.filter((activity) => activity._id !== activityId));
  };
  
  useEffect(() => {
    // Extract `touristId` from the token
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setTouristId(decodedToken.id);
        console.log("Tourist ID:", decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.error("No token found.");
    }
  }, []);


  useEffect(() => {
    let tid="";
    const token = Cookies.get("token");
    const fetchSavedEvents = async () => {
      console.log("touristId :",touristId);
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log("Tourist ID2222:", decodedToken.id);
        tid=decodedToken.id;
      try {
        const { savedActivities, savedItineraries } = await viewAllSavedEventsApi(tid);
        setSavedActivities(savedActivities);
        setSavedItineraries(savedItineraries);
      } catch (error) {
        console.error("Error fetching saved events:", error);
      }
    }
    };

    fetchSavedEvents();
  }, []);



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





  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <div className="row gy-24">
              {savedItineraries.map((itinerary) => (
                  <TourSingleCard
                    tour={itinerary}
                    key={itinerary._id}
                    className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                    tourWrapperClass="tour-wrapper style-one"
                    isparentClass={true}
                    onUnsaved={removeUnsavedItinerary} // Add this line
                  />
                ))}
          {savedActivities.map((activity) => (
            <TourSingleCard2
              tour={activity}
              key={activity._id}
              className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
              tourWrapperClass="tour-wrapper style-one"
              isparentClass={true}
              onUnsaved={removeUnsavedActivity}
            />
          ))}

          {(savedItineraries.length === 0 && savedActivities.length === 0) && (
              <div className="no-saved-events-message" style={{ textAlign: "center", marginTop: "20px", fontSize: "18px", color: "gray", paddingLeft: "20px" }}>
                No saved events yet...
              </div>
          )}



              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
            {/* <ItinerariesSidebarMain applyFilters={applyFilters} applySearch={applySearch} /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedEventsGrid;
