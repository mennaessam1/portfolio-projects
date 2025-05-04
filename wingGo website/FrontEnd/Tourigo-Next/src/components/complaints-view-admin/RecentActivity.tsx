//RecentActivity.tsx
'use client'
import { recentActivityData } from '@/data/recent-activity-data';
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Complaint } from '@/interFace/interFace';
import { fetchComplaints, updateComplaintStatus  } from '@/api/complaintsApi';
import { getComplaintsData } from '@/data/complaints-data';
import NotificationModal from './NotificationModal';


const ComplaintsList = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchComplaintsData = async () => {
            try {
                const response = await getComplaintsData();
                setComplaints(response);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };

        fetchComplaintsData();
    }, []);

    // Filter complaints based on the selected status
    const filteredComplaints = complaints.filter((complaint) => 
        statusFilter === 'all' || complaint.state === statusFilter
    );

    // Sort the filtered complaints by date
    const sortedComplaints = [...filteredComplaints].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

        // Function to handle status update
        // Function to handle status update
    const handleStatusToggle = async (id: string, currentState: 'pending' | 'resolved') => {
        const newState = currentState === 'pending' ? 'resolved' : 'pending';
        try {
            const updatedComplaint = await updateComplaintStatus(id, newState);
            setComplaints(prevComplaints =>
                prevComplaints.map(complaint => 
                    complaint._id === id ? { ...complaint, state: updatedComplaint.state } : complaint
                )
            );
            setNotification({ message: `Status updated successfully to ${newState}`, type: 'success' });
        } catch (error) {
            setNotification({ message: 'Failed to update status. Please try again.', type: 'error' });
            console.error("Error updating complaint status:", error);
        }
    };

    return (
        <section className="bd-recent-activity section-space-small-bottom">
            <div className="container" style={{ paddingTop: "40px" }}>
                
                
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="recent-activity-wrapper">
                            <div className="section-title-wrapper section-title-space">
                                <h2 className="section-title">Complaints</h2>
                            </div>
                            <div className="row mb-3 d-flex align-items-center" style={{ gap: "20px", paddingBottom: "60px" }}>
                            <div className="col-auto">
  <label htmlFor="statusFilter" className="me-2">Status:</label>
  <select
    id="statusFilter"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'resolved')}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ced4da",
      fontSize: "16px",
      color: "#495057",
      backgroundColor: "#fff",
      marginBottom: "15px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999999' d='M2 0L0 2h4zM2 5L0 3h4z'/></svg>")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
      backgroundSize: "10px",
    }}
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="resolved">Resolved</option>
  </select>
</div>
<div className="col-auto">
  <label htmlFor="sortOrder" className="me-2">Sort by Date:</label>
  <select
    id="sortOrder"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ced4da",
      fontSize: "16px",
      color: "#495057",
      backgroundColor: "#fff",
      marginBottom: "15px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999999' d='M2 0L0 2h4zM2 5L0 3h4z'/></svg>")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
      backgroundSize: "10px",
    }}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
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
                            <div className="recent-activity-content">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            {sortedComplaints.map((complaint) => (
                                                <tr key={complaint._id} className="table-custom">
                                                    <td>
                                                        <div className="dashboard-thumb-wrapper p-relative">
                                                            <div className="dashboard-thumb image-hover-effect-two position-relative">
                                                                {/* Add an image or thumbnail here if necessary */}
                                                            </div>
                                                            <div className="dashboard-date">
                                                                <div className="badge bg-primary">
                                                                    <div className="d-block">
                                                                        <h5 className="badge-title">{complaint.state}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                                            <div>
                                                                <h5 className="complaint-title fw-5 underline">
                                                                <Link href={`/complaint-details-admin/${complaint._id}`}>
                                                                  {complaint.title}
                                                                </Link>
                                                                </h5>
                                                                <p>Status: {complaint.state}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    
                                                    <td>
                                                        <ul className="recent-activity-list">
                                                            <li className="trip-title" style={{ float: 'right', paddingRight: '10px' }}>Sent On: 
                                                            <span className="trip-date" >
                                                                    {complaint.date ? new Date(complaint.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </td>

                                                    <td>
                                            <button
                                                onClick={() => handleStatusToggle(complaint._id, complaint.state)}
                                                className="bd-primary-btn btn-style radius-60"
                                                
                                            >
                                                {complaint.state === 'pending' ? 'Mark as Resolved' : 'Mark as Pending'}
                                            </button>
                                        </td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplaintsList;
