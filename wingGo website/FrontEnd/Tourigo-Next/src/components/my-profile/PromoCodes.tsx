"use client";

import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { fetchAvailablePromoCodes } from "@/api/promocodesApi";
import { PromoCode } from "@/interFace/interFace";
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';

interface PromoCodesProps {
  id: string;
}

const PromoCodes: React.FC<PromoCodesProps> = ({ id }) => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const promoCodes = await fetchAvailablePromoCodes();
        setPromoCodes(promoCodes);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCodes();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (promoCodes.length === 0) {
    return ( <section className="bd-team-details-area section-space position-relative">
      <div className="container"
      style={{
        maxWidth: "90%", // Adjust the width to utilize the right side
        margin: "0 auto", // Center the container
      }}
      ><h1>No promo codes available.</h1>
      </div>
      </section>);
  }

  return (
    <section className="bd-team-details-area section-space position-relative">
  <div className="container"
  style={{
    maxWidth: "90%", // Adjust the width to utilize the right side
    margin: "0 auto", // Center the container
  }}
  >

    <h2 className="team-single-title">Promo Codes</h2>
    <div className="promo-code-list">
      {promoCodes.map((promoCode) => (
        <div
          key={promoCode._id}
          className="promo-code-card"
          style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            background: '#f9f9f9',
            maxWidth: '100%', // Adjust width to prevent the page from looking empty
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4
              style={{
                fontSize: '18px',
                margin: '0 10px 0 0',
                wordBreak: 'break-word',
                flex: '1',
              }}
            >
              {promoCode.code}
            </h4>
            <button
              style={{
                padding: '5px 10px',
                fontSize: '14px',
                borderRadius: '60px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard.writeText(promoCode.code);
                toast.success(`Promo code  copied to clipboard!`, {

                });
              }}
            >
              <FaShareAlt />
            </button>
          </div>
          <p style={{ margin: '10px 0 5px' }}>
            <strong>Discount:</strong> {promoCode.discount}%
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Valid Until:</strong> 
            {new Date(promoCode.endDate).toLocaleDateString()}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Status:</strong> {promoCode.isActive ? 'Active' : 'Expired'}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default PromoCodes;
