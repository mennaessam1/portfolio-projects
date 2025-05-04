import React from "react";

const MinusIcon = () => {
  return (
    <>
      <div className="minus-icon-container">
        <svg
          width="10"
          height="2"
          viewBox="0 0 10 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <style jsx>{`
        .minus-icon-container {
          display: inline-block;
          cursor: pointer;
        }
        .minus-icon-container svg {
          transition: stroke 0.3s ease; /* Smooth transition for color change */
        }
        .minus-icon-container:hover svg {
          stroke: red; /* Change color on hover */
        }
      `}</style>
    </>
  );
};


export default MinusIcon;
