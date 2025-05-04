import React from 'react';

interface StarRatingProps {
  rating: number;
  numberOfStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, numberOfStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= numberOfStars; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fa fa-star" style={{ color: 'gold' }}></i>);
    } else if (i - rating < 1) {
      stars.push(<i key={i} className="fa fa-star-half-alt" style={{ color: 'gold' }}></i>);
    } else {
      stars.push(<i key={i} className="fa fa-star" style={{ color: 'lightgray' }}></i>);
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;