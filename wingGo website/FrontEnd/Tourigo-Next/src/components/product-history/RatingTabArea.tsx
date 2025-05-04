import React, { useState } from 'react';
import GetRatting from "@/hooks/GetRatting";
import { rateProduct, reviewProduct } from '@/api/productApi';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;  // Corresponds to the `sellerId` in the token
  username: string;
  role: string;
  mustChangePassword: boolean;
}

interface RatingTabAreaProps {
  touristId: string;
  productId: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const RatingTabArea: React.FC<RatingTabAreaProps> = ({ touristId, productId, onSuccess, onError }) => {
  const [productRating, setProductRating] = useState<number>(0);
  const [productComment, setProductComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleProductRatingChange = (rating: number) => {
    setProductRating(rating);
  };

  const handleSubmitProductReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await rateProduct(touristId, productId, productRating);
      await reviewProduct(touristId, productId, productComment);
      const successMessage = "Your product rating and comment were submitted successfully.";
      setMessage(successMessage);
      if (onSuccess) onSuccess(successMessage);
    } catch (error) {
      const errorMessage = "Error submitting your product review. Please try again.";
      setMessage(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return (
    <div className="rating-tab mb-35" style={{ padding: '15px' }}>
      <h4 style={{ marginBottom: '15px' }}>Rate & Comment on Product</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmitProductReview} style={{ padding: '10px' }}>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Rating</label>
          <div className="rating-buttons" style={{ marginTop: '10px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleProductRatingChange(star)}
                style={{
                  color: star <= productRating ? "#ffd700" : "#e4e5e9",
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label>Comment</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Share your experience with the product..."
            value={productComment}
            onChange={(e) => setProductComment(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit Product Review
        </button>
      </form>
    </div>
  );
};

export default RatingTabArea;
