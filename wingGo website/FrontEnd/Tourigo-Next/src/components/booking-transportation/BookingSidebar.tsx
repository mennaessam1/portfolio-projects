import React, { useState, useEffect } from "react";
import Image from "next/image";
import { imageLoader } from "@/hooks/image-loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchTransports } from "@/api/transportApi";
import { Transport } from "@/interFace/interFace";
import Link from "next/link";
import { idTypeNew } from "@/interFace/interFace";

const BookingSidebar = ({ id }: idTypeNew) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [data, setData] = useState<Transport | null>(null);
  const [itineraries, setItineraries] = useState<Transport[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bookingProducts = useSelector(
    (state: RootState) => state.booking.bookingProducts
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transports = await fetchTransports(); // Fetch transports
        const transport = transports.find((item) => item._id === id);
        setData(transport || null);
        setItineraries(transports.filter((item) => item._id !== id)); // Filter transports
      } catch (err) {
        setError("Error loading transport details.");
        console.error("Error fetching transports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  

  return (
    <>
      <div className="sidebar-sticky">
        {data?._id && (
          <>
            <aside className="booking-sidebar-wrapper mb-24">
              <div className="booking-sidebar-widget-wrapper mb-30">
                <div className="booking-sidebar-widget-thumb mb-15">
                  <Image
                      src="/images/default-image.jpg"
                      loader={imageLoader}
                      alt="Itinerary Image"
                      width={500} // Adjust width as needed
                      height={300} // Adjust height as needed
                    />

                </div>
                <div className="booking-sidebar-widget-content">
                    <h6 className="booking-item-title small underline mb-5">
                      {data.type} Transport
                    </h6>
                    <div className="booking-item-location">
                      <span>
                        <i className="fas fa-map-marker-alt"></i>
                      </span>{" "}
                      City: {data.city || "N/A"}
                    </div>
                    <div className="booking-item-duration">
                      <span>
                        <i className="fas fa-clock"></i>
                      </span>{" "}
                      Duration: {data.duration || "N/A"}
                    </div>
                  </div>

              </div>
              <div className="booking-sidebar-widget-wrapper">
  <div className="booking-sidebar-price-wrapper">
    <div className="booking-sidebar-price-content">
      <div className="booking-sidebar-price-total d-flex flex-wrap justify-content-between">
        <div className="booking-sidebar-price-item-title b3 fw-7">
          Price
        </div>
        <div className="booking-sidebar-price-item-amount b3 fw-7">
          ${data.price?.toLocaleString("en-US") || "N/A"}
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
