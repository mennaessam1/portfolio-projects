'use client'
import { recentActivityData } from '@/data/recent-activity-data';
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecentActivity = () => {
    return (
        <>
            <section className="bd-recent-activity section-space-small-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="recent-activity-wrapper">
                                <div className="section-title-wrapper section-title-space">
                                    <h2 className="section-title">Recent Activity</h2>
                                </div>
                                <div className="recent-activity-content">
                                    <div className="table-responsive">
                                        <table className="table mb-0">
                                            <tbody>
                                                {
                                                    recentActivityData && recentActivityData.map(tour => <tr key={tour.id} className="table-custom">
                                                        <td>
                                                            <div className="dashboard-thumb-wrapper p-relative">
                                                                <div className="dashboard-thumb image-hover-effect-two position-relative">
                                                                    <Image src={tour.img} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image" />
                                                                </div>
                                                                <div className="dashboard-date">
                                                                    <div className="badge bg-primary">
                                                                        <div className="d-block">
                                                                            <h5 className="badge-title">{tour.day}</h5>
                                                                            <span>{tour.month}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                                                <div>
                                                                    <h5 className="tour-title fw-5 underline"><Link href="/tour-listing-edit">{tour.title}</Link></h5>
                                                                    <div className="recent-activity-location underline">
                                                                        <Link href="#">{tour.location}</Link>
                                                                    </div>
                                                                    <p className="">{tour.adult} Adults {tour.infant && `& ${tour.infant} Infant`} Staying</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="recent-activity-price-box">
                                                                <h5 className="mb-10">${tour.price}</h5>
                                                                <p>Total/Person</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <ul className="recent-activity-list">
                                                                <li className="trip-title">Trip id: <span className="trip-id">{tour.tripId}</span></li>
                                                                <li className="trip-title">Booked on: <span className="trip-date">{tour.tripDate}</span></li>
                                                            </ul>
                                                        </td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RecentActivity;