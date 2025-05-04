import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getActivitiesData } from "@/data/act-data";
import { Activity } from "@/interFace/interFace";
import Link from "next/link";
import { idTypeNew } from "@/interFace/interFace";
import { fetchImage } from "@/api/activityApi";



const BookingSidebar = ({ id }: idTypeNew) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<Activity | null>(null);
  const [activity, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_IMAGE = "/assets/images/Activity.jpeg";
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE);


  const bookingProducts = useSelector(
    (state: RootState) => state.booking.bookingProducts
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activities = await getActivitiesData();
        const activity = activities.find((item) => item._id === id);
        setData(activity || null);
        setActivities(activities.filter((item) => item._id !== id));
      } catch (err) {
        setError("Error loading tour details.");
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (data?._id && data?.photo) { // Check if the item has an image
          const url = await fetchImage(data._id);
          if (url) {
            console.log("Fetched Image URL:", url); // Verify if a valid URL is returned
            setImageUrl(url);
            console.log(imageUrl);
          }
        }
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, [data?._id, data?.photo,imageUrl]);
  

  return (
    <>
      <div className="sidebar-sticky">
        {data?._id && (
          <>
            <aside className="booking-sidebar-wrapper mb-24">
              <div className="booking-sidebar-widget-wrapper mb-30">
                <div className="booking-sidebar-widget-thumb mb-15">
                  <Image
                    src={data?.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                    alt="Activity Image"
                  />
                </div>
                <div className="booking-sidebar-widget-content">
                  <h6 className="booking-item-title small underline mb-5">
                    {data.name}
                  </h6>
                  <div className="booking-item-date">
                    <Link href={`/activity-details/${data._id}`}>
                         <span>
                          <i className="icon-cleander-check"></i>
                        </span>{" "}
                        {data.date} 
                    </Link>
                    
                  </div>
                  <div className="booking-item-date">
                    <Link href={`/activity-details/${data._id}`}>
                         <span>
                         <i className="fas fa-clock"></i>
                        </span>{" "}
                        {data.time} 
                    </Link>
                    
                  </div>
                </div>
              </div>
              <div className="booking-sidebar-widget-wrapper">
                <div className="booking-sidebar-price-wrapper">
                  <div className="booking-sidebar-price-content">
                    <div className="booking-sidebar-price-total d-flex flex-wrap justify-content-between">
                      <div className="booking-sidebar-price-item-title b3 fw-7">
                        Price/Person
                      </div>
                      <div className="booking-sidebar-price-item-amount b3 fw-7">
                        ${data.price || "1800.00"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </>
  );
};

export default BookingSidebar;
