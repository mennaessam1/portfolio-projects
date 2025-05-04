// TourDetails.tsx
"use client";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TourDetailTabArea from "@/components/order-details/TourDetailTabArea";
import { Order, idTypeNew } from "@/interFace/interFace";
import axios from "axios";
import {cancelOrderData} from "@/data/orders-data";
import TourSingleCard from "../common/tourElements/TourSingleCardIt";
import BookingFormModal from "@/elements/modals/BookingFormModal";

const OrderDetails = ({ id }: idTypeNew) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrderDetails = async () => {
    try {
      console.log("Fetching order details for id:", id);
      const response = await axios.get(`http://localhost:8000/tourist/orderDetails/${id}`);
      setOrder(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

    // Handle cancel order
    const handleCancelOrder = async () => {
      if (!order) return;
  
      const confirmCancel = window.confirm("Are you sure you want to cancel your order?");
      if (!confirmCancel) return;
      console.log('Attempting to cancel order with:', {
        buyer: order.buyer,
        orderId: order._id,
      });
    
      try {
        const response =  await cancelOrderData(order.buyer as string, order._id);
        console.log('Cancel Order Response:', response);

        alert("Order has been successfully canceled.");
  
        // After canceling, re-fetch the order details
        await fetchOrderDetails();
      } catch (error) {
        console.error('Error during order cancellation:', error);
        alert("Failed to cancel the order. Please try again later.");
      }
    };
  
    // Show loading message while fetching
    if (loading) return <p>Loading...</p>;
  
    if (!order) return <p>No order found.</p>;
  return (
    <section className="order-details-area py-5">
      <div className="container">
        <div className="order-details-card p-4 rounded shadow-lg bg-light">
          <h3 className="order-title mb-4 text-primary text-center" style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Order Number: {order.orderId}
          </h3>

          <div className="row mb-4 align-items-center">
            <div className="col-md-6 d-flex align-items-center">
              <p className="order-status mb-0 me-4">
                <strong>Status: </strong>
                <span className={`badge ${order.orderStatus === "delivered" ? "bg-success" : "bg-warning"}`}>
                  {order.orderStatus}
                </span>
              </p>
            
            
              <p className="payment-status mb-0">
                <strong>Payment Status: </strong>
                <span className={`badge ${order.paymentStatus === "paid" ? "bg-success" : "bg-danger"}`}>
                  {order.paymentStatus}
                </span>
              </p>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                       {/* Cancel Order Button */}
                       {order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" && (
                <button
                  className="bd-primary-btn btn-style radius-60"
                  onClick={handleCancelOrder}
                  style={{
                    marginLeft: "-10px", // Adjust left margin to slightly move the button closer
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          <div className="order-details-info mb-4">
            <h4 className="text-secondary">Order Details:</h4>
            <p><strong>Total Price: </strong>${order.totalPrice}</p>
           
          </div>

          <div className="order-products">
            <h5 className="text-secondary">Ordered Products:</h5>
            <ul className="list-group">
              {order.products.map((product, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                  <h6>
          {product?.productId && typeof product.productId === 'object' && product.productId.name
            ? product.productId.name
            : "Product name not available"}
        </h6>
                    <p>Quantity: {product.quantity}</p>
                    <p>
          Price: $
          {product?.productId && typeof product.productId === 'object' && product.productId.price
            ? product.productId.price
            : "N/A"}
        </p>
                  </div>
                  <div>
                  
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
