"use client";

import React, { useEffect, useState } from "react";
import { searchTransportsByUserId } from "@/api/FlightApi";
import { format } from 'date-fns';

interface TransportBooking {
    _id: string;
    type: string;
    duration: string;
    price: number;
    city: string;
    touristID?: string;
  }

interface TransportBookingsProps {
  id: string;
}

const TransportBookings: React.FC<TransportBookingsProps> = ({ id }) => {
  const [TransportBookings, setTransportBookings] = useState<TransportBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransportBookings = async () => {
      try {
        const bookings = await searchTransportsByUserId(id);
        console.log("Fetched bookings:", bookings); // Debugging step
        setTransportBookings(bookings);
      } catch (error) {
        console.error("Error fetching Transport bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportBookings();
  }, [id]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  const formatPrice = (price: { base: number; currency: string; total: number; taxes: { amount: number; code: string; included: boolean; }[] }) => {
    return `${price.total} ${price.currency}`;
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (TransportBookings.length === 0) {
    return <h1>No bookings found.</h1>;
  }

  return (
    <section className="bd-team-details-area section-space position-relative">
      <div className="container">
        <div className="row justify-content-between gy-24">
          <div className="col-xxl-9 col-xl-7 col-lg-7 col-md-7">
            <div className="team-single-wrapper">
              <div className="team-contents mb-30">
                <div className="team-heading mb-15">
                  <h2 className="team-single-title">Transport Bookings</h2>
                </div>
                <div className="team-info mb-20">
                  <h4 className="mb-15">Bookings:</h4>
                  <ul className="booking-list">
                    {TransportBookings.length >0  && TransportBookings?.map((booking) => (
                      <li key={booking._id} className="booking-item card mb-3" style={{ marginLeft: "10px" }}>
                        <div className="card-body">
                          <h5 className="card-title">{booking.type}</h5>
                          <p className="card-text">
                            <strong>Duration:</strong> {booking.duration}
                          </p>
                          <p className="card-text">
                            <strong>City:</strong> {booking.city}
                          </p>
                          <p className="card-text">
                            <strong>Price:</strong> {booking.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportBookings;