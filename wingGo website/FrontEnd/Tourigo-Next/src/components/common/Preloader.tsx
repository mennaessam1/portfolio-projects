import React from "react";

const Preloader = () => {
  return (
    <>
      <div id="preloader">
        <div className="bd-three-bounce">
          <div className="bd-child bd-bounce1"></div>
          <div className="bd-child bd-bounce2"></div>
          <div className="bd-child bd-bounce3"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
