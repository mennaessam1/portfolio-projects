"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import tourImgFive from "../../../public/assets/images/tour/tour-img-5.png";
import { imageLoader } from "@/hooks/image-loader";
import { bookflight, searchFlights } from "@/api/FlightApi";
import { set } from "react-hook-form";
import { bookHotel, searchHotels } from "@/api/HotelApi";
import HotelCard from "../common/tourElements/HotelCard";
import { useRouter } from "next/navigation";



interface HotelAreaProps {
    cityCode: string;
    searchTriggered: boolean;
    setSearchTriggered: (value: boolean) => void;
    checkinDate: Date | null;
    checkoutDate: Date | null;
    adults: number;
  }

const HotelArea: React.FC<HotelAreaProps> = ({
    cityCode,
    searchTriggered,
    setSearchTriggered,
    checkinDate,
    checkoutDate,
    adults
}) => {

  const router = useRouter();
  
  const [tripData, setTripData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        if (checkinDate && checkoutDate) {
          //YYYY-MM-DD
          const formattedCheckinDate = checkinDate.toISOString().split('T')[0];
          const formattedCheckoutDate = checkoutDate.toISOString().split('T')[0];
          const response = await searchHotels({
              cityCode: cityCode,
              checkin: formattedCheckinDate,
              checkout: formattedCheckoutDate,
          });
          const data = await response;
          setTripData(data);
          console.log('Trip data:', data);
        }
        
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    if (searchTriggered && cityCode) {
        fetchTripData();
        setSearchTriggered(false);
    }
  }, [searchTriggered, cityCode]);

  
   const handleBookHotel = async (hotel: any) => {

        try {
          console.log('Booking hotel:', hotel);
          localStorage.setItem("selectedHotel", JSON.stringify(hotel));
          const query = new URLSearchParams({
            adults: adults.toString(),
            checkin: checkinDate?.toISOString().split('T')[0] || '',
            checkout: checkoutDate?.toISOString().split('T')[0] || '',
          });

          router.push(`/booking-hotel?${query}`);
    
        } catch (error) {
          console.error('Error booking hotel:', error);
        }
      }

  const handleItemClick = (item: any) => {
    console.log(item);
  };

  

  return (
    <>
      <div className="row gy-24">
        <div className="col-12">
          <h2>Total Hotels Found: {tripData.length}</h2> {/* Display the length of the array */}
        </div>
        {tripData &&
          tripData.map((hotel) => (
            <div key={hotel.hotelId} className="col-xl-6 col-lg-6 col-md-6">
              <HotelCard
            hotel={hotel}
            onBook={handleBookHotel}
            className="hotel-card"
            hotelWrapperClass="hotel-wrapper"
            isparentClass={true}
            adults={adults}
          />
            </div>
          ))}
        
      </div>
    </>
  );
};

export default HotelArea;
