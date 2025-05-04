"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GetRatting from "@/hooks/GetRatting";
import { imageLoader } from "@/hooks/image-loader";
import { Product } from "@/interFace/interFace";
import { fetchTouristData } from "@/api/productApi"; // Adjust the import path as necessary
import Link from "next/link";

interface ReviewCommentsProps {
  product: Product;
}

interface ReviewWithTouristName {
  touristId: string;
  name: string;
  review: string;
}

const ReviewComments: React.FC<ReviewCommentsProps> = ({ product }) => {
  const [reviewsWithNames, setReviewsWithNames] = useState<ReviewWithTouristName[]>([]);

  useEffect(() => {
    const fetchReviewsWithNames = async () => {
      const reviewsWithNames = await Promise.all(
        product.reviews.map(async (review) => {
          const touristData = await fetchTouristData(review.touristId);
          console.log('Tourist Data:', touristData); // Debugging log
          return {
            ...review,
            name: touristData ? touristData.username : "Unknown Tourist",
          };
        })
      );
      console.log('Reviews with Names:', reviewsWithNames); // Debugging log
      setReviewsWithNames(reviewsWithNames);
    };

    fetchReviewsWithNames();
  }, [product.reviews]);

  return (
    <>
      <div className="tour-details-rating-wrapper mb-35">
        <div className="rewiew-content">
          {reviewsWithNames.length > 0 ? (
            reviewsWithNames.map((review, index) => (
              <div key={index} className="tour-review-wrapper">
                <div className="media">
                  <div className="thumbnail">
                    <Link href="#">
                      <Image
                        src="/assets/img/candidate/aa.png" // Replace with actual avatar path if available
                        alt="Author Images"
                        loader={imageLoader}
                        width={50}
                        height={50}
                        className="thumbnail-image"
                      />
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="author-info">
                      <h5 className="title">
                        <Link className="hover-flip-item-wrapper" href="#">
                          {review.name}
                        </Link>
                      </h5>
                      <ul className="bd-meta">
                        <li className="has-seperator">
                          On: <span>{new Date().toLocaleDateString()}</span>
                        </li>
                        
                      </ul>
                    </div>
                    <div className="content">
                      <p className="description">
                        {review.review}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .tour-details-rating-wrapper {
          margin-top: 20px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .tour-review-wrapper {
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
          margin-bottom: 10px;
        }
        
        .media {
          display: flex;
          align-items: center;
        }
        
        .thumbnail {
          margin-right: 15px;
          overflow: hidden; /* Ensure the image doesn't overflow the container */
        }
        
        .thumbnail-image {
          transition: transform 0.3s ease, opacity 0.3s ease; /* Add transition for smooth effect */
        }
        
        .thumbnail:hover .thumbnail-image {
          transform: scale(1.1); /* Scale the image on hover */
          opacity: 0.8; /* Change opacity on hover */
        }
        
        .media-body {
          flex: 1;
        }
        
        .author-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .author-info .title {
          font-size: 1.1em;
          margin: 0;
        }
        
        .thumbs-up-icon {
          margin-left: 10px; /* Add space between the username and the thumbs-up icon */
        }
        
        .bd-meta {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 10px;
        }
        
        .bd-meta .has-seperator::after {
          content: "|";
          margin-left: 10px;
        }
        
        .rating {
          display: flex;
          align-items: center;
        }
        
        .content .description {
          margin-top: 10px;
          font-size: 1em;
          color: #555;
        }
      `}</style>
    </>
  );
};

export default ReviewComments;