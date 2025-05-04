"use client";

import React, { useEffect, useState } from "react";
import TripAreaTwo from "../shearedComponents/TripAreaTwo";
import SidebarSearchArea from "../shearedComponents/SidebarSearchArea";
import PaginationWrapperTwo from "../shearedComponents/PaginationWrapperTwo";
import FlightSearchArea from "../shearedComponents/FlightSearchArea";
import FlightArea from "../shearedComponents/FlightArea";
import HotelSearchArea from "../shearedComponents/HotelSearchArea";
import TourSingleCard from "../common/tourElements/TourSingleCard";
import { bookHotel, searchHotels } from "@/api/HotelApi";
import HotelArea from "../shearedComponents/HotelArea";


const SearchHotels = () => {
    const [cityCode, setCityCode] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [checkinDate, setCheckinDate] = useState<Date | null>(null);
    const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);

    const [hotelData, setHotelData] = useState<any[]>([]);


    

    
     
    
  return (
    <>
      <div className="bd-blog-grid-area section-space">
        <div className="container">
          <div className="row gy-24">
            <div className="col-xxl-4 col-xl-4 col-lg-5 order-lg-0 order-1">
              <HotelSearchArea
                cityCode={cityCode}
                setCityCode={setCityCode}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                adults={adults}
                setAdults={setAdults}
                setSearchTriggered={setSearchTriggered}/>
                
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-7 order-lg-1 order-0">
              {/*trip area*/}
              <HotelArea 
                cityCode={cityCode}
                checkinDate={checkinDate}
                checkoutDate={checkoutDate}
                searchTriggered={searchTriggered}
                setSearchTriggered={setSearchTriggered}
                adults={adults}
                />
                
              {/*pagination area*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHotels;