"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import TourDetailTabArea from "@/components/complaint-details-admin/TourDetailTabArea";
import { Complaint, idTypeNew } from "@/interFace/interFace";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import BookingFormModal from "@/elements/modals/BookingFormModal";
import { updateComplaintStatus } from "@/api/complaintsApi";
import NotificationModal from "@/components/common/NotificationModal";

const ComplaintDetails = ({ id }: idTypeNew) => {
  const [data, setData] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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

  const handleReplyPosted = (reply: string) => {
    if (data) {
      setData({ ...data, reply: [...(data.reply || []), reply] });
    }
  };

  const handleStatusToggle = async () => {
    if (!data) return;
    const newState = data.state === 'pending' ? 'resolved' : 'pending';
    try {
      const updatedComplaint = await updateComplaintStatus(data._id, newState);
      setData({ ...data, state: updatedComplaint.state });
      setNotification({ message: `Status updated successfully to ${newState}`, type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to update status. Please try again.', type: 'error' });
      console.error("Error updating complaint status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No complaint found.</div>;

  return (
    <section className="complaint-details-area">
      <div className="container" style={{ paddingTop:'30px', paddingBottom:'30px' }} >
        <div className="complaint-details-card p-4 rounded shadow-lg bg-white">
          <div className="row mb-3 align-items-center">
            {/* Title and Date Section */}
            <div className="col-md-6">
              <h3 className="complaint-title mb-0" style={{ fontSize: '6rem', fontWeight: 'bold' }}>
                {data.title}
              </h3>
              <p className="mb-0" style={{ fontSize: '1.5rem' }}>
                <strong>Date:</strong> {new Date(data.date).toLocaleDateString()}
              </p>
            </div>
            
            {/* Status and Button Section */}
<div className="col-md-6 d-flex flex-column align-items-start" style={{ maxWidth: '200px', paddingTop: '100px' }}>
  <p className="mb-1">
    <strong>Status:</strong> {data.state}
  </p>
  <button
    onClick={handleStatusToggle}
    className="bd-primary-btn btn-style radius-60"
    style={{
      padding: '6px 12px',
      fontSize: '14px',
      borderRadius: '20px',
      width: '150px',
      marginTop: '30px' // Adjust this value as needed for more spacing
    }}
  >
    {data.state === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
  </button>
</div>

          </div>

          <div className="complaint-body">
            <h4 className="mb-2 text-secondary">Details:</h4>
            <p className="text-muted" style={{ lineHeight: '1.6' }}>{data.body}</p>
          </div>

          <TourDetailTabArea ComplaintData={data} onReplyPosted={handleReplyPosted} />
        </div>
      </div>

      {/* Notification Modal */}
      {notification && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </section>
  );
};

export default ComplaintDetails;
