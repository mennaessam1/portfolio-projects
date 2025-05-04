'use client'
import { recentActivityData } from '@/data/recent-activity-data';
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Complaint } from '@/interFace/interFace';
import { fetchTouristComplaints } from '@/api/complaintsApi';
import { getComplaintsDataTourist } from '@/data/complaints-data';

const ComplaintsList = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    

    useEffect(() => {
        const getComplaints = async () => {
            try {
                const response = await getComplaintsDataTourist();
                setComplaints(response);
            } catch (error) {
                console.error("Error fetching tourist complaints:", error);
            }
        };

        getComplaints();
    }, []);

    return (
        <section className="bd-recent-activity section-space-small-bottom">
            <div className="container"  style={{ paddingTop: "40px" }}>
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="recent-activity-wrapper">
                            <div className="section-title-wrapper section-title-space">
                                <h2 className="section-title">My Complaints</h2>
                            </div>
                            <div className="recent-activity-content">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            {complaints.map((complaint) => (
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
                                                                <Link href={`/complaint-details/${complaint._id}`}>
                                                                  {complaint.title}
                                                                </Link>
                                                                </h5>
                                                                <p>Status: {complaint.state}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <ul className="recent-activity-list">
                                                            <li className="trip-title" style={{ float: 'right' , paddingRight: '10px' }}>Sent On: 
                                                            <span className="trip-date">
                                                                    {complaint.date ? new Date(complaint.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </td>    

                                                    {/* <div className="admin-reply">
  {complaint.reply ? (
    <>
      <h4 className="mb-2 text-secondary">Admin's Reply:</h4>
      <p className="text-muted" style={{ lineHeight: '1.6' }}>
        {complaint.reply}
      </p>
    </>
  ) : (
    <p>No reply yet from the admin.</p>
  )}
</div> */}
                                               
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