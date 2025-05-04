// TourDetails.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TourDetailTabArea from "@/components/complaint-details/TourDetailTabArea";
import { Complaint, idTypeNew } from "@/interFace/interFace";
import { Itinerary } from "@/interFace/interFace";
import axios from "axios";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import BookingFormModal from "@/elements/modals/BookingFormModal";

const ComplaintDetails  = ({ id }: idTypeNew) => {
  const [data, setData] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        console.log("Fetching complaint details for id:", id);
        const response = await axios.get(`http://localhost:8000/admin/detailscomplaint/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint details:", error);
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);


  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No complaint found.</div>;

  return (
    <section className="complaint-details-area">
      <div className="container">
        <div className="complaint-details-card p-4 rounded shadow-lg bg-white">
          <h3 className="complaint-title mb-3 text-primary"style={{ fontSize: '6rem', fontWeight: 'bold' }}>{data.title}</h3>
          <div className="row mb-3">
            <div className="col-md-6"style={{ fontSize: '1.5rem' }}>
              <p><strong><i className="icon-calendar me-2"></i>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6">
              <p><strong><i className="icon-status me-2"></i>Status:</strong> {data.state}</p>
            </div>
          </div>
          <div className="complaint-body">
            <h4 className="mb-2 text-secondary">Details:</h4>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>{data.body}</p>
          </div>

    


          
          <TourDetailTabArea ComplaintData={data}  />
        </div>
      </div>
    </section>
  );
};  

export default ComplaintDetails;
