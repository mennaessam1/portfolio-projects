"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Itinerary } from "@/interFace/interFace";
import { imageLoader } from "@/hooks/image-loader";
import {fetchTouristUsername } from '@/api/itineraryApi';

// Import Google Font
import "@fontsource/playfair-display"; // or any other fancy font you like

interface TourDetailsPostFormProps {
  itineraryData: Itinerary;
}

interface Comment {
  tourist: string;
  text: string;
}



const TourDetailsPostForm: React.FC<{ itineraryData: Itinerary }> = ({ itineraryData }) => {
  const [usernames, setUsernames] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const names: Record<string, string> = {};  // Define the type for names
      for (const comment of itineraryData.comment) {
        names[comment.tourist] = await fetchTouristUsername(comment.tourist);
      }
      setUsernames(names);
    };

    fetchUsernames();
  }, [itineraryData]);

  return (
    <div className="tour-details-rating-wrapper">
      <div className="post-comments-title">
      <h4 className="title"  style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        Tourist Reviews
      </h4>
    </div>
      <div className="review-content">
        {itineraryData.comment.map((item, index) => (
          <div key={index} className="tour-review-wrapper">
            <div className="media">
              <div className="media-body">
                <div className="author-info">
                  <h5 >{usernames[item.tourist] || "Loading..."}</h5>
                </div>
                <div className="content">
                  <p className="description">{item.text}</p>
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
