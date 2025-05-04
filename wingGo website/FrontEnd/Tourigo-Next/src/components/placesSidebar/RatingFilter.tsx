// RatingFilter.tsx
"use client";
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 1; // Increment by whole numbers (0, 1, 2, 3, 4, 5)
const MIN = 0; // Minimum value for ratings
const MAX = 5; // Maximum value for ratings

interface RatingFilterProps {
  onChange: (range: number[]) => void; // Explicitly define the type for onChange
}

const RatingFilter: React.FC<RatingFilterProps> = ({ onChange }) => {
  const [values, setValues] = useState([MIN]); // Start with the minimum value

  const handleFilterByRating = (updatedValues: number[]) => {
    const newValues = [updatedValues[0], MAX]; // Fix the max to 5
    setValues(newValues);
    onChange(newValues); // Send the new range to the parent
  };

  return (
    <div className="sidebar-widget-range">
      <div className="slider-range-wrap">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(updatedValues) => handleFilterByRating(updatedValues)}
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
                    values: [values[0], MAX],
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
            value={`${values[0]} - ${MAX} stars`}
            readOnly
            id="amount"
          />
        </label>
      </div>
    </div>
  );
};

export default RatingFilter;

