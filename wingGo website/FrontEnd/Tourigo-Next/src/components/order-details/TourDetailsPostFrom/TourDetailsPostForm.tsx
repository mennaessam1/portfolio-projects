//TourDetailsPostForm.tsx
import GetRatting from "@/hooks/GetRatting";
import React from "react";
import { Order } from "@/interFace/interFace";
import axios from "axios";
import { useState } from "react";

interface TourDetailsPostFormProps {
  orderId: string;
}
const TourDetailsPostForm: React.FC<TourDetailsPostFormProps> = ({ orderId }) => {




  
  return (
    <div className="post-comment-form">
      <div className="post-comments-title">
        <h4 className="mb-15">Order Details</h4>
      </div>
      <p>Viewing details for Order ID: {orderId}</p>


    </div>
  );
};

export default TourDetailsPostForm;

