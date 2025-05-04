import GetRatting from "@/hooks/GetRatting";
import React, { useEffect, useState } from "react";
import { Activity } from "@/interFace/interFace";
import { imageLoader } from "@/hooks/image-loader";
import {fetchTouristUsername } from '@/api/itineraryApi';
import "@fontsource/playfair-display"; 



const TourDetailsPostForm: React.FC<{ activityData: Activity }> = ({ activityData }) => {
  const [usernames, setUsernames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const names: Record<string, string> = {}; // This will map touristId to username
  
      // Iterate over the activityData comments to fetch each tourist's username
      for (const comment of activityData.comments) {
        const { touristId } = comment;
        try {
          const username = await fetchTouristUsername(touristId); // Get the username directly
          names[touristId] = username;  // Store it in the names object
        } catch (error) {
          console.error(`Error fetching username for touristId ${touristId}:`, error);
        }
      }
  
      setUsernames(names); // Update state with the fetched usernames
    };
  
    if (activityData?.comments?.length) {
      fetchUsernames();
    }
  }, [activityData]);
  
  return (
    <div className="tour-details-rating-wrapper">
      <div className="post-comments-title">
        <h4 className="title" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
          Tourist Reviews
        </h4>
      </div>
      <div className="review-content">
        {activityData.comments.map((item, index) => (
          <div key={index} className="tour-review-wrapper">
            <div className="media">
              <div className="media-body">
                <div className="author-info">
                  <h5>{usernames[item.touristId] || "Loading..."}</h5>
                </div>
                <div className="content">
                  <p className="description">{item.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .tour-review-wrapper {
          transition: box-shadow 0.3s ease;
          padding: 15px;
          border-radius: 8px;
        }
        .tour-review-wrapper:hover {
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TourDetailsPostForm;
