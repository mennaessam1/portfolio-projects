"use client";

import React, { useEffect, useState } from "react";
import { searchHotelsByUserId } from "@/api/HotelApi";
import { format } from 'date-fns';

interface HotelBooking {
  _id: string;
  hotel: {
    name: string;
    address?: string;
  };
  city: string;
  checkInDate: string;
  checkOutDate: string;
  guests: {
    adults: number;
  }
  price: {
    base: number;
    currency: string;
    total: number;
    taxes: {
      amount: number;
      code: string;
      included: boolean;
    }[];
  };
  bookingStatus: string;
  confirmationNumber?: string;
}

interface HotelBookingsProps {
  id: string;
}

const HotelBookings: React.FC<HotelBookingsProps> = ({ id }) => {
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotelBookings = async () => {
      try {
        const bookings = await searchHotelsByUserId(id);
        console.log("Fetched bookings:", bookings); // Debugging step
        setHotelBookings(bookings);
      } catch (error) {
        console.error("Error fetching hotel bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelBookings();
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

  if (hotelBookings.length === 0) {
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
                  <h2 className="team-single-title">Hotel Bookings</h2>
                </div>
                <div className="team-info mb-20">
                  <h4 className="mb-15">Bookings:</h4>
                  <ul className="booking-list">
                    {hotelBookings.length>0 && hotelBookings?.map((booking) => (
                      <li key={booking._id} className="booking-item card mb-3" style={{ marginLeft: "10px" }}>
                        <div className="card-body">
                          <h5 className="card-title">{booking.hotel.name}</h5>
                          <p className="card-text">
                            <strong>Beds:</strong> {booking.guests.adults}
                          </p>
                          <p className="card-text">
                            <strong>Check-In Date:</strong> {formatDate(booking.checkInDate)}
                          </p>
                          <p className="card-text">
                            <strong>Check-Out Date:</strong> {formatDate(booking.checkOutDate)}
                          </p>
                          <p className="card-text">
                            <strong>Booking Status:</strong> {booking.bookingStatus || "N/A"}
                          </p>
                          <p className="card-text">
                            <strong>Confirmation Number:</strong> {booking.confirmationNumber || "N/A"}
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

export default HotelBookings;