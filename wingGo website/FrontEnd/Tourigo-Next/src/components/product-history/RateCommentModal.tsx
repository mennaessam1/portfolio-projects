import React, { useState } from "react";
import { rateProduct, reviewProduct } from "@/api/productApi";
import { Product } from "@/interFace/interFace";
import { IPurchasedProduct } from "@/interFace/interFace";

interface RateCommentModalProps {
  product: IPurchasedProduct; // Update to use IPurchasedProduct if applicable
  productId: string;
  touristId: string;
  onClose: () => void;
}

const RateCommentModal: React.FC<RateCommentModalProps> = ({
  productId,
  touristId,
  product,
  onClose
}) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleRateProduct = async () => {
    try {
      await rateProduct(touristId, productId, rating);
      setSuccessMessage("Rating submitted successfully!");
      setRating(0); // Reset rating input
    } catch (error) {
      console.error("Error rating product:", error);
      setSuccessMessage("Failed to submit rating.");
    }
  };

  const handleReviewProduct = async () => {
    try {
      await reviewProduct(touristId, productId, review);
      setSuccessMessage("Review submitted successfully!");
      setReview(""); // Reset review input
    } catch (error) {
      console.error("Error reviewing product:", error);
      setSuccessMessage("Failed to submit review.");
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Rate and Review Product: {product.name}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {/* Rating Section */}
        <div style={{ marginBottom: '15px' }}>
          <label>Rate this product:</label>
          <div style={{ display: 'flex', gap: '5px', margin: '10px 0' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: star <= rating ? '#ffd700' : '#e4e5e9', // Gold if selected, gray if not
                }}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleRateProduct}
            className="bd-primary-btn btn-style radius-60 mb-10"
          >
            Submit Rating
          </button>
        </div>

        {/* Review Section */}
        <div style={{ marginBottom: '15px' }}>
          <label>Write a review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={handleReviewProduct}
            className="bd-primary-btn btn-style radius-60 mb-10"
          >
            Submit Review
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <p style={{ color: successMessage.includes("successfully") ? "green" : "red" }}>
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default RateCommentModal;