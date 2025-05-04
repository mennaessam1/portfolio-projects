"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import tourImgFive from "../../../public/assets/images/tour/tour-img-5.png";
import { imageLoader } from "@/hooks/image-loader";
import { bookflight, searchFlights } from "@/api/FlightApi";
import { set } from "react-hook-form";
import FlightCard from "../common/tourElements/FlightCard";
import { useRouter } from "next/navigation";



interface FlightAreaProps {
    origin: string;
    destination: string;
    departureDate: Date | null;
    searchTriggered: boolean;
    setSearchTriggered: (value: boolean) => void;
  }

const FlightArea: React.FC<FlightAreaProps> = ({
    origin,
    destination,
    departureDate,
    searchTriggered,
    setSearchTriggered
}) => {

  const router = useRouter();
  
  const [tripData, setTripData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await searchFlights({
            origin, 
            destination, 
            departureDate: departureDate?.toISOString().split('T')[0] || '',

        });
        const data = await response;
        setTripData(data);
        console.log('Trip data:', data);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    if (searchTriggered && origin && destination && departureDate) {
        fetchTripData();
        setSearchTriggered(false);
    }
  }, [searchTriggered, origin, destination, departureDate?.toISOString().split('T')[0]]);

  const handleBookFlight = async (flight: any) => {
    try {
      
      localStorage.setItem('selectedFlight', JSON.stringify(flight));

      const query = new URLSearchParams({
        origin: origin.toString(),
        destination : destination.toString(),
        departureDate: departureDate?.toISOString().split('T')[0] || '',
      });

      

      router.push(`/booking-flight?${query}`);

      
    } catch (error) {
      
      console.error('Error booking flight:', error);
    }
  }

  const handleItemClick = (item: any) => {
    console.log(item);
  };

  const formatSegments = (segments: any[]) => {
    const codes = segments.map(segment => segment.departure.iataCode);
    codes.push(segments[segments.length - 1].arrival.iataCode); // Add the final destination
    return codes.join('->');
  };

  return ( tripData?
    <>
      <div className="row gy-24">
        <div className="col-12">
          <h2>Total Flights Found: {tripData.length}</h2> {/* Display the length of the array */}
        </div>
        {tripData &&
          tripData.map((item) => (
            <div key={item.id} className="col-xl-6 col-lg-6 col-md-6">
              <FlightCard
                flight={item}
                onBook={handleBookFlight}
                className="flight-card"
                flightWrapperClass="hotel-wrapper"
                isparentClass={true}
            
              />
            </div>
          ))}
        
      </div>
    </>
  :
  <div>
      <h1>Loading...</h1>
  </div>
  );
};

export default FlightArea;
