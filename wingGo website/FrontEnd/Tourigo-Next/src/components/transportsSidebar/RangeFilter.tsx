// RangeFilter.tsx
"use client";
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 500;

interface RangeFilterProps {
  onChange: (range: number[]) => void; // Explicitly define the type for onChange
}

const RangeFilter: React.FC<RangeFilterProps> = ({ onChange }) => {
  const [values, setValues] = useState([MIN, 225]);

  const handleFilterByRange = (updatedValues: number[]) => {
    const newValues = [MIN, updatedValues[1]]; // Fix the min to 0
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
          onChange={(updatedValues) => handleFilterByRange(updatedValues)}
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
            value={`$${values[0].toFixed(1)} - $${values[1].toFixed(1)}`}
            readOnly
            id="amount"
          />
        </label>
      </div>
    </div>
  );
};

export default RangeFilter;
