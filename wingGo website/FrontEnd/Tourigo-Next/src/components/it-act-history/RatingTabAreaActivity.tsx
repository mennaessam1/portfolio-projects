import React, { useState } from 'react';
import { rateActivityApi, commentOnActivityApi } from '@/api/activityApi';

interface RatingTabAreaProps {
  touristId: string;
  activityId: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const RatingTabArea: React.FC<RatingTabAreaProps> = ({ touristId, activityId, onSuccess, onError }) => {
  const [activityRating, setActivityRating] = useState<number>(0);
  const [activityComment, setActivityComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [activitySubmitted, setActivitySubmitted] = useState<boolean>(false);

  const handleActivityRatingChange = (rating: number) => {
    setActivityRating(rating);
  };

  const handleSubmitActivityReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activityRating > 0) {
        await rateActivityApi(touristId, activityId, activityRating);
      }
      if (activityComment.trim()) {
        await commentOnActivityApi(touristId, activityId, activityComment);
      }
      
      const successMessage = "Your activity review was submitted successfully.";
      setMessage(successMessage);
      setActivitySubmitted(true);
      if (onSuccess) onSuccess(successMessage);
    } catch (error) {
      const errorMessage = "Error submitting your activity review. Please try again.";
      setMessage(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return (
    <div className="rating-tabs mb-35" style={{ padding: '15px' }}>
      <h4 style={{ marginBottom: '15px' }}>Rate & Comment on Activity</h4>
      {message && <div className="alert alert-info">{message}</div>}
      {activitySubmitted ? (
        <div className="thank-you-message">
          <h4>Thank you for reviewing the activity! We appreciate it.</h4>
        </div>
      ) : (
        <form onSubmit={handleSubmitActivityReview} style={{ padding: '10px' }}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Rating</label>
            <div className="rating-buttons" style={{ marginTop: '10px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleActivityRatingChange(star)}
                  style={{
                    color: star <= activityRating ? "#ffd700" : "#e4e5e9",
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
              placeholder="Share your experience with the activity..."
              value={activityComment}
              onChange={(e) => setActivityComment(e.target.value)}
              style={{ padding: '8px', width: '100%' }}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit Activity Review
          </button>
        </form>
      )}
    </div>
  );
};

export default RatingTabArea;
