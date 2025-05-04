// TourGridRight.tsx

"use client";
import React, { useEffect, useState } from "react";
// import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import ActivitiesSidebarMain from "../activitiesSidebar/ItinerariesSidebarMainAdv";
import PaginationWrapper from "../shearedComponents/PaginationWrapper";
import TourSingleCard from "../common/tourElements/ActivitySingleCard";
import { Activity } from "@/interFace/interFace";
import { getActivitiesData,getActivities_Adv } from "@/data/act-data";
import BookingFormModal from "@/elements/modals/BookingFormModal";

const TourGridRight = () => {
  const [activities, setActivities] = useState<Activity[]>([]); // All activities
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  
  const removeActivity = (id: string) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity._id !== id));
};
useEffect(() => {
  const fetchActivities = async () => {
    const data = await getActivities_Adv();
    setActivities(data || []); // Set the full activities list
    setFilteredActivities(data || []); // Initially set filtered activities to all activities
  };
  fetchActivities();
}, []);

 // Apply filters for date and language
 const applyFilters = (filters: { date?: string; language?: string }) => {
  let updatedActivities = activities;

  // Apply date filter
  if (filters.date) {
    updatedActivities = updatedActivities.filter((activity) =>
      activity.date.startsWith(filters.date as string)
    );
  }

  // Apply language filter
  if (filters.language) {
    updatedActivities = updatedActivities.filter(
      (activity) => activity.language === filters.language
    );
  }

  setFilteredActivities(updatedActivities);
};

const applySearch = (query: string) => {
  const updatedActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredActivities(updatedActivities);
};

  return (
    <>
      <section className="bd-tour-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <div className="row gy-24">
                {/* Conditional rendering to ensure activities is an array */}
                {filteredActivities?.length > 0 ? (
                  filteredActivities.map((item) => (
                    <TourSingleCard
                      tour={item}
                      key={item._id}
                      className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                      tourWrapperClass="tour-wrapper style-one"
                      isparentClass={true}
                      isAdvertiser={true}
                      onUnsaved={removeActivity}
                    />
                  ))
                ) : (
                  <p>No activities found.</p>
                )}
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5">
            <ActivitiesSidebarMain
          applyFilters={applyFilters}
          applySearch={applySearch}
        />
            </div>
          </div>
          
        </div>
      </section>
      <BookingFormModal />
    </>
  );
};

export default TourGridRight;
