'use client'
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '@/interFace/interFace';
import { fetchTouristOrders } from '@/api/ordersApi';
import { getOrdersDataTourist } from '@/data/orders-data';

const OrdersList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await getOrdersDataTourist();
                setOrders(response);
            } catch (error) {
                console.error("Error fetching tourist orders:", error);
            }
        };

        getOrders();
    }, []);

    return (
        <section className="bd-recent-activity section-space-small-bottom">
            <div className="container"  style={{ paddingTop: "40px" }}>
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="recent-activity-wrapper">
                            <div className="section-title-wrapper section-title-space">
                                <h2 className="section-title">My Orders</h2>
                            </div>
                            <div className="recent-activity-content">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id} className="table-custom">
                                                    <td>
                                                        <div className="dashboard-thumb-wrapper p-relative">
                                                            <div className="dashboard-thumb image-hover-effect-two position-relative">
                                                                {/* Add an image or thumbnail here if necessary */}
                                                            </div>
                                                            <div className="dashboard-date">
                                                                <div className="badge bg-primary">
                                                                    <div className="d-block">
                                                                        <h5 className="badge-title">{order.paymentStatus}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="recent-activity-title-box d-flex align-items-center gap-10">
                                                            <div>
                                                                <h5 className="complaint-title fw-5 underline">
                                                                <Link href={`/order-details/${order._id}`}>
                                                                Order Number: {order.orderId}
                                                                </Link>
                                                                </h5>
                                                                
                                                                <p>Status: {order.orderStatus}</p>
                                                               
                                                                <p> Payment Method: {order.paymentMethod } </p>
           
                                                                <p>Total Price: {order.totalPrice}</p>
                                                           
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                       
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

export default OrdersList;