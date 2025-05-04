"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import sideBarBg from "../../../public/assets/images/bg/sidebar-img.png";
import SidebarBookingForm from "@/forms/SidebarBookingForm";
import SidebarBlogList from "./SidebarBlogList";
import SidebarSearchInputBox from "./SidebarSearchInputBox";
import ReactDatePicker from "react-datepicker";
import DatePicker from 'react-datepicker';


import InputBox from "./InputBox";
import { useDispatch } from "react-redux";

interface HotelSearchAreaProps {
    cityCode: string;
    setCityCode: (value: string) => void;
    setSearchTriggered: (value: boolean) => void;
    checkinDate: Date | null;
    setCheckinDate: (date: Date | null) => void;
    checkoutDate: Date | null;
    setCheckoutDate: (date: Date | null) => void;
    adults: number;
    setAdults: (value: number | ((prevState: number) => number)) => void;
  }

const HotelSearchArea: React.FC<HotelSearchAreaProps> = ({
    cityCode,
    setCityCode,
    setSearchTriggered,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    adults,
    setAdults
  
}) => {

    
  


    const handleSearchClick = () => {
        console.log("Adults:", adults); 
        setSearchTriggered(true);
      };

      const handleAdultIncreament = () => {
        setAdults((prevState : number) => prevState + 1);
      };
      const handleAdultDecreament = () => {
        setAdults((prevState) => (prevState - 1 > 1 ? prevState - 1 : 1));
      };


  return (
    <>
      <aside className="sidebar-wrapper sidebar-sticky">
        <div className="sidebar-widget-wrapper mb-30">
          <div className="sidebar-widget widget">
            <h6 className="sidebar-widget-title small mb-15">City Name</h6>
            <div className="sidebar-search">
              <InputBox
                placeHolder="City Name"
                value={cityCode}
                onChange={(e) => setCityCode(e.target.value)}
              />
            </div>
          </div>
          <div className="sidebar-widget widget w-100 mt-30">
            <h6 className="sidebar-widget-title small mb-15">
              Select Check In Date
            </h6>
            
            <DatePicker
              selected={checkinDate}
              onChange={(date) => {setCheckinDate(date); console.log(date?.toISOString().split('T')[0] || '')}}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="form-control w-100"
              wrapperClassName="w-100"
            />
            </div>

            <div className="sidebar-widget widget w-100 mt-30">
            <h6 className="sidebar-widget-title small mb-15">
              Select Check Out Date
            </h6>
            
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => {setCheckoutDate(date); console.log(date?.toISOString().split('T')[0] || '')}}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              className="form-control w-100"
              wrapperClassName="w-100"
            />
            </div>

            <div className="d-flex gap-24 justify-content-between align-items-center mb-30 mt-30">
                          <h6 className="guest-title small">Adult</h6>
                          <div className="guest-number">
                            <span
                              onClick={() =>
                                handleAdultDecreament()
                              }
                              className="guest-number-minus"
                            >
                              <i className="fa-sharp fa-regular fa-minus"></i>
                            </span>
                            <input
                              className="guest-number-input"
                              type="text"
                              value={adults}
                              readOnly
                            />
                            <span
                              onClick={() =>
                                handleAdultIncreament()
                              }
                              className="guest-number-plus"
                            >
                              <i className="fa-sharp fa-regular fa-plus"></i>
                            </span>
                          </div>
                        </div>

          

          <div className="sidebar-widget-divider"></div>

          <div className="col-lg-2 mt-30 w-100" onClick={handleSearchClick}>
          <button className="bd-btn btn-style radius-4 w-100" type="submit">
              Search Hotels
              <span>
                <i className="fa-regular fa-arrow-right"></i>
              </span>
            </button>
          </div>
          
          
          
        </div>
        
      </aside>
    </>
  );
};

export default HotelSearchArea;
