"use client";
import { selectTourType } from "@/data/homeTwo/select-tour-type-data";
import { selectLocationData } from "@/data/nice-select-data";
import NiceSelect from "@/elements/NiceSelect";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

interface propsType {
  wrapperClass?: string;
}

const SearchFilterTwo = ({ wrapperClass }: propsType) => {
  //date picker
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const selectHandler = () => {};
  return (
    <>
      <div className={`banner-search-box ${wrapperClass ? wrapperClass : ""}`}>
        <div className="banner-search-form">
          <div className="banner-search-field has-separator d-flex align-items-center gap-10">
            <div className="search-icon-bg">
              <span>
                <i className="fa-regular fa-location-dot"></i>
              </span>
            </div>
            <div className="banner-search-item banner-select">
              <p className="b2 mb-0 fw-5">Where to</p>
              <div className="banner-search-select large-arrow-button">
                <NiceSelect
                  options={selectLocationData}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  className=""
                  placeholder="Select Location"
                />
              </div>
            </div>
          </div>
          <div className="banner-search-field has-separator d-flex align-items-center gap-10">
            <div className="search-icon-bg">
              <span>
                <i className="icon-cleander"></i>
              </span>
            </div>
            <div className="banner-search-item">
              <p className="b2 mb-0 fw-5">Duration</p>
              <div className="banner-form-input">
                <ReactDatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(date: any) => {
                    setDateRange(date);
                  }}
                  isClearable={true}
                  placeholderText="Select Date"
                />
              </div>
            </div>
          </div>
          <div className="banner-search-field d-flex align-items-center gap-10">
            <div className="search-icon-bg">
              <span>
                <i className="fa-regular fa-location-dot"></i>
              </span>
            </div>
            <div className="banner-search-item banner-select">
              <p className="b2 mb-0 fw-5">Tour Types</p>
              <div className="banner-search-select large-arrow-button">
                <NiceSelect
                  options={selectTourType}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  className=""
                  placeholder="Tour Type"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="banner-search-button">
          <button
            type="submit"
            className="banner-btn banner-square-btn bd-btn btn-style radius-10"
          >
            <span>
              <i className="fa-regular fa-magnifying-glass"></i>
            </span>{" "}
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchFilterTwo;
