"use client";
import useGlobalContext from "@/hooks/use-context";
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 500;

const RangeFilter = () => {
  const { setFilterRange, setNiceSelectData, setFilterSearch } =
    useGlobalContext();
  const [values, setValues] = useState([25, 225]);
  const [inputValue, setInputValue] = useState(
    `$${values[0].toFixed(1)} - ${values[1].toFixed(1)}`
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFilterByRange = (values: number[]) => {
    setValues(values);
    setFilterRange(values);
    setInputValue(`$${values[0].toFixed(1)} - ${values[1].toFixed(1)}`);
    setNiceSelectData("");
    setFilterSearch("");
  };
  return (
    <div className="sidebar-widget-range">
      <div className="slider-range-wrap">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            handleFilterByRange(values);
          }}
          renderTrack={({ props, children }) => (
            <div
              className="slider-range-wrap-inner"
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
            >
              <div
                ref={props.ref}
                style={{
                  height: "6px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#006CE4", "#ccc"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div className="slider-range-button" {...props}></div>
          )}
        />
      </div>
      <div className="price-filter mt-10">
        <label htmlFor="amount">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            id="amount"
          />
        </label>
      </div>
    </div>
  );
};

export default RangeFilter;
