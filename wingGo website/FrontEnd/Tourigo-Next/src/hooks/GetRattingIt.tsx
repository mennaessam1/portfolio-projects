//GetRatting.tsx
import Link from "next/link";
import React from "react";
interface rattingType {
  averageRating: number;
  ratingExists: boolean;
}
const GetRatting = ({ averageRating, ratingExists }: rattingType) => {
  const getRating = (ratingsNum: number) => {
    const roundedRatings = Math.floor(ratingsNum); // Round down to the nearest integer
    const isHalfStar = ratingsNum % 1 !== 0; // Check if there's a decimal part

    const emptyRatingCount = 5 - roundedRatings - (isHalfStar ? 1 : 0);
    const ratings = [];

    if(ratingExists){
      for (let i = 0; i < roundedRatings; i++) {
        ratings.push(<i className="fas fa-star" key={`l-${i}`}></i>);
      }
  
      if (isHalfStar) {
        ratings.push(<i className="fas fa-star-half-alt" key="half-star"></i>);
      }
    }

    let k= ratingExists? 0 : -1;

    for (k; k < emptyRatingCount; k++) {
      ratings.push(<i className="fal fa-star" key={`p-${k}`}></i>);
    }

    return ratings;
  };
  return (
    <>
      {" "}
      <Link href="">{getRating(averageRating)}</Link>{" "}
    </>
  );
};

export default GetRatting;
