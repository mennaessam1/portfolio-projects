import useScrollDirection from "@/hooks/sticky-header";
import BackTopIcon from "@/svg/BackTopIcon";
import React, { useRef, useEffect } from "react";
const BacktoTop = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection(elementRef.current);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div
        ref={elementRef}
        className={`backtotop-wrap cursor-pointer ${
          scrollDirection === "down" ? "active-progress" : ""
        }`}
      >
        <BackTopIcon />
      </div>
    </>
  );
};

export default BacktoTop;
