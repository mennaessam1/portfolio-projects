"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import tourImgNine from "../../../public/assets/images/tour/tour-img-9.png";
import tourImgTwentyOne from "../../../public/assets/images/tour/tour-img-21.png";
import tourImgTwentyTwo from "../../../public/assets/images/tour/tour-img-22.png";
import { clientReviewData } from "@/data/client-review-data";
import TourDetailsPostForm from "./TourDetailsPostFrom/TourDetailsPostForm";
import { Activity } from '@/interFace/interFace';
import GetRatting from "@/hooks/GetRatting";
import { updateActivityApi } from "@/api/activityApi";
import { toast } from "sonner";
import { TbEdit } from "react-icons/tb";
import { useEffect } from "react";
import { getAllActCategories } from "@/api/adminApi"; // Import category API
import { getAvailableTags } from "@/api/itineraryApi";

interface Category {
  _id: string;
  name: string;
}
interface TourDetailTabAreaProps {
  activityData: Activity;
  advertiserId: string; 
  isAdvertiser: boolean
}
// Function to format date into a readable string
const formatDate = (date: string | Date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
};


const TourDetailTabArea: React.FC<TourDetailTabAreaProps> = ({
  activityData: initialActivityData,
  advertiserId,
  isAdvertiser
}) =>  {
  const [isEditing, setIsEditing] = useState(false);
  const [activityData, setActivityData] = useState(initialActivityData);
  const [updatedActivity, setUpdatedActivity] = useState({
    name: activityData.name || "",
    date: activityData.date || "",
    time: activityData.time || "",
    location: activityData.location || "",
    price: activityData.price || 0,
    category: activityData.category || "",
    tags: activityData.tags || [],
    specialDiscounts: activityData.specialDiscounts || "",
    description: activityData.description || "",
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
const [isEditingTags, setIsEditingTags] = useState(false);
const [isLoadingTags, setIsLoadingTags] = useState(true); // Track loading state
useEffect(() => {
  const fetchTags = async () => {
    try {
      const response = await getAvailableTags(); // Fetch tags from API
      setAvailableTags(response.map((tag: any) => tag.name)); // Assuming `response` contains a `name` field
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      toast.error("Failed to load tags.");
    } finally {
      setIsLoadingTags(false);
    }
  };

  fetchTags();
}, []);

  const [categories, setCategories] = useState<Category[]>([]);
const [isLoadingCategories, setIsLoadingCategories] = useState(true);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await getAllActCategories(); // API call to fetch categories
      setCategories(response); // Update categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);
  const handleSaveChanges = async () => {
    try {
      await updateActivityApi(activityData._id, updatedActivity, advertiserId);
      setActivityData((prevData) => ({
        ...prevData,
        ...updatedActivity,
      }));
      toast.success("Activity updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update activity. Please try again.");
    }
  };
  
  return (
    <>
      <div className="tour-details-nav-tabs mb-35">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-overview-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-overview"
              type="button"
              role="tab"
              aria-controls="nav-overview"
              aria-selected="true"
            >
              Overview
            </button>
           
            <button
              className="nav-link"
              id="nav-feedback-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-feedback"
              type="button"
              role="tab"
              aria-controls="nav-feedback"
              aria-selected="false"
              tabIndex={-1}
            >
              Feedback
            </button>
          </div>
        </nav>
        <div className="tab-content mt-25" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="nav-overview"
            role="tabpanel"
            aria-labelledby="nav-overview-tab"
            tabIndex={0}
          >
            
            <p className="mb-15 d-flex align-items-center">
        <strong>Date:</strong>
        {isEditing ? (
          <input
            type="date"
            value={updatedActivity.date}
            onChange={(e) =>
              setUpdatedActivity({ ...updatedActivity, date: e.target.value })
            }
            className="form-control ms-2"
            style={{ width: "auto" }}
          />
        ) : (
          <span>{new Date(activityData.date).toLocaleDateString()}</span>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-link p-0 ms-2"
          style={{ cursor: "pointer" }}
        >
          {isAdvertiser &&<TbEdit size={20} />}
        </button>
      </p>
      
           <p className="mb-15 d-flex align-items-center">
  <strong>Time:</strong>
  {isEditing ? (
    <input
      type="time"
      value={updatedActivity.time}
      onChange={(e) =>
        setUpdatedActivity({ ...updatedActivity, time: e.target.value })
      }
      className="form-control ms-2"
      style={{ width: "auto" }}
    />
  ) : (
    <span>{activityData.time}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
    {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
            
<p className="mb-15 d-flex align-items-center">
  <strong>Category:</strong>
  {isEditing ? (
    <select
      value={updatedActivity.category}
      onChange={(e) =>
        setUpdatedActivity({ ...updatedActivity, category: e.target.value })
      }
      className="form-control ms-2"
      style={{ width: "auto" }}
    >
      <option value="" disabled>
        Select a category
      </option>
      {isLoadingCategories ? (
        <option>Loading categories...</option>
      ) : (
        categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))
      )}
    </select>
  ) : (
    <span>{activityData.category || "No category selected"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
   {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
<p className="mb-15 d-flex align-items-start">
  <strong>Description:</strong>
  {isEditing ? (
    <textarea
      value={updatedActivity.description}
      onChange={(e) =>
        setUpdatedActivity({
          ...updatedActivity,
          description: e.target.value,
        })
      }
      className="form-control ms-2"
      style={{ width: "auto", resize: "vertical" }}
      rows={4} // Adjust rows for multiline input
      placeholder="Enter a detailed description"
    ></textarea>
  ) : (
    <span>{activityData.description || "No description provided"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
   {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
<p className="mb-15 d-flex align-items-start">
  <strong>Location:</strong>
  {isEditing ? (
    <textarea
      value={updatedActivity.location}
      onChange={(e) =>
        setUpdatedActivity({
          ...updatedActivity,
          location: e.target.value,
        })
      }
      className="form-control ms-2"
      style={{ width: "auto", resize: "vertical" }}
      rows={3} // Adjust rows for multiline input
      placeholder="Enter the location address"
    ></textarea>
  ) : (
    <span>{activityData.location || "No location provided"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
   {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
<p className="mb-15 d-flex align-items-center">
  <strong>Price:</strong>
  {isEditing ? (
    <input
      type="number"
      value={updatedActivity.price}
      onChange={(e) =>
        setUpdatedActivity({
          ...updatedActivity,
          price: +e.target.value, // Convert to number
        })
      }
      className="form-control ms-2"
      style={{ width: "auto" }}
      placeholder="Enter the activity price"
      min="0" // Ensure the price is non-negative
    />
  ) : (
    <span>{activityData.price ? `${activityData.price} USD` : "No price set"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
   {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
<p className="mb-15 d-flex align-items-start">
  <strong>Tags:</strong>
  {isEditing ? (
    <textarea
      value={updatedActivity.tags.join(", ")} // Convert tags array to a comma-separated string
      onChange={(e) =>
        setUpdatedActivity({
          ...updatedActivity,
          tags: e.target.value.split(",").map((tag) => tag.trim()), // Split input into an array of tags
        })
      }
      className="form-control ms-2"
      style={{ width: "100%", resize: "vertical" }}
      placeholder="Enter tags separated by commas"
    ></textarea>
  ) : (
    <span>{activityData.tags?.join(", ") || "No tags provided"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
   {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
<p className="mb-15 d-flex align-items-start">
  <strong>Special Discounts:</strong>
  {isEditing ? (
    <textarea
      value={updatedActivity.specialDiscounts} // The current special discounts
      onChange={(e) =>
        setUpdatedActivity({
          ...updatedActivity,
          specialDiscounts: e.target.value, // Update the specialDiscounts field
        })
      }
      className="form-control ms-2"
      style={{ width: "100%", resize: "vertical" }}
      placeholder="Enter details about special discounts"
    ></textarea>
  ) : (
    <span>{activityData.specialDiscounts || "No special discounts provided"}</span>
  )}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="btn btn-link p-0 ms-2"
    style={{ cursor: "pointer" }}
  >
    {isAdvertiser &&<TbEdit size={20} />}
  </button>
</p>
        {isEditing && (
        <button onClick={handleSaveChanges} className="btn btn-primary mt-3">
          Save Changes
        </button>
      )}
       
            <div className="tour-details-faq mb-35">
  
  <div className="accordion-wrapper faq-style-3">
    <div className="accordion" id="accordionExampleThree">
      
    </div>
  </div>
  <style jsx>{`
  /* Hide the default Bootstrap accordion arrow */
  .accordion-button::after {
    display: none;
  }
`}</style>

</div>



          </div>
          {/* Gallery Tab */}
         
          {/* Feedback Tab */}
          <div
            className="tab-pane fade"
            id="nav-feedback"
            role="tabpanel"
            aria-labelledby="nav-feedback-tab"
            tabIndex={0}
          >
            <div className="tour-details-rating-wrapper mb-35">
  <div className="row gy-24 align-items-center">
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4">
      <div className="rating-box">
        <div className="inner">
          {/* Display the average rating rounded to one decimal place */}
          <div className="rating-number">
            {activityData.averageRating.toFixed(1)}
          </div>
          <div className="rating">      
        <GetRatting averageRating={activityData.averageRating} />
      </div>

          <span className="sub-title">
            ({activityData.ratings.length} {activityData.comments.length === 1 ? "Review" : "Reviews"})
          </span>
        </div>
      </div>
    </div>
    <div className="col-lg-10 col-md-8 col-sm-7">
                <div className="review-wrapper">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = activityData.ratings.filter((ratingObj) => ratingObj.rating === star).length;
                    const percentage = activityData.ratings.length
                      ? ((count / activityData.ratings.length) * 100).toFixed(1)
                      : 0;
                    return (
                      <div className="single-progress-bar" key={star}>
                      <div className="rating-text">{star}</div>
                      <div className="progress">
                        <div
                          className={`progress-bar progress-bar-${star}`}
                          role="progressbar"
                          style={{ width: `${percentage}%` }}
                          aria-valuenow={Number(percentage)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        ></div>
                      </div>
                      <span className="value-text">{percentage}%</span>
                      <span className="number">{count}</span>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <style jsx>{`
              .rating-box .fa-star.filled {
                color: #ffd700; /* Gold color for filled stars */
              }
                .progress-bar-5 {
                  background-color: #4CAF50; /* Green */
                }
                .progress-bar-4 {
                  background-color: #8BC34A; /* Light Green */
                }
                .progress-bar-3 {
                  background-color: #FFC107; /* Amber */
                }
                .progress-bar-2 {
                  background-color: #FF9800; /* Orange */
                }
                .progress-bar-1 {
                  background-color: #F44336; /* Red */
                }
            `}</style>
          </div>

             <TourDetailsPostForm activityData={activityData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetailTabArea;
