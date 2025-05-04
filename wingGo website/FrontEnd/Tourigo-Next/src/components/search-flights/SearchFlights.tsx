"use client";

import React , { useState } from "react";
import TripAreaTwo from "../shearedComponents/TripAreaTwo";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import PaginationWrapperTwo from "../shearedComponents/PaginationWrapperTwo";
import FlightSearchArea from "../shearedComponents/FlightSearchArea";
import FlightArea from "../shearedComponents/FlightArea";

const SearchFlights = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [searchTriggered, setSearchTriggered] = useState(false);
    
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 order-lg-0 order-1">
              <FlightSearchArea 
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                setSearchTriggered={setSearchTriggered}/>
                
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 order-lg-1 order-0">
              {/*trip area*/}
              <FlightArea 
                origin={origin}
                destination={destination}
                departureDate={departureDate}
                searchTriggered={searchTriggered}
                setSearchTriggered={setSearchTriggered}
                />
                
              {/*pagination area*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFlights;