import React, { useState } from 'react';
import GetRatting from "@/hooks/GetRatting";
import { rateItineraryApi, commentOnItineraryApi } from '@/api/itineraryApi';
import { rateTourGuideApi, commentOnTourGuideApi } from '@/api/itineraryApi';

interface RatingTabAreaProps {
  touristId: string;
  itineraryId: string;
  tourGuideId: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const RatingTabArea: React.FC<RatingTabAreaProps> = ({ touristId, itineraryId, tourGuideId, onSuccess, onError }) => {
  const [activeTab, setActiveTab] = useState<string>('itinerary');
  const [itineraryRating, setItineraryRating] = useState<number>(0);
  const [guideRating, setGuideRating] = useState<number>(0);
  const [itineraryComment, setItineraryComment] = useState<string>("");
  const [guideComment, setGuideComment] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [itinerarySubmitted, setItinerarySubmitted] = useState<boolean>(false); // State for itinerary submission
  const [guideSubmitted, setGuideSubmitted] = useState<boolean>(false); // State for guide submission

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleItineraryRatingChange = (rating: number) => {
    setItineraryRating(rating);
  };

  const handleGuideRatingChange = (rating: number) => {
    setGuideRating(rating);
  };

  const handleSubmitItineraryReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (itineraryRating > 0) {
        await rateItineraryApi(touristId, itineraryId, itineraryRating);
      }
      if (itineraryComment.trim()) {
        await commentOnItineraryApi(touristId, itineraryId, itineraryComment);
      }
      
      const successMessage = "Your itinerary review was submitted successfully.";
      setMessage(successMessage);
      setItinerarySubmitted(true); // Set itinerarySubmitted to true
      if (onSuccess) onSuccess(successMessage);
    } catch (error) {
      const errorMessage = "Error submitting your itinerary review. Please try again.";
      setMessage(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  const handleSubmitGuideReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (guideRating > 0) {
        await rateTourGuideApi(touristId, tourGuideId, guideRating);
      }
      if (guideComment.trim()) {
        await commentOnTourGuideApi(touristId, tourGuideId, guideComment);
      }
      
      const successMessage = "Your tour guide review was submitted successfully.";
      setMessage(successMessage);
      setGuideSubmitted(true); // Set guideSubmitted to true
      if (onSuccess) onSuccess(successMessage);
    } catch (error) {
      const errorMessage = "Error submitting your tour guide review. Please try again.";
      setMessage(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return (
    <div className="rating-tabs mb-35" style={{ padding: '15px' }}>
      <nav>
        <div className="nav nav-tabs" role="tablist">
          <button
            className={`nav-link ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => handleTabChange('itinerary')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'itinerary'}
            style={{ marginRight: '10px' }}
          >
            Rate Itinerary
          </button>
          <button
            className={`nav-link ${activeTab === 'tourGuide' ? 'active' : ''}`}
            onClick={() => handleTabChange('tourGuide')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'tourGuide'}
          >
            Rate Tour Guide
          </button>
        </div>
      </nav>
      <div className="tab-content mt-25" style={{ marginTop: '20px' }}>
        {activeTab === 'itinerary' ? (
          itinerarySubmitted ? (
            <div className="thank-you-message">
              <h4>Thank you for reviewing the itinerary! We appreciate it.</h4>
            </div>
          ) : (
            <div className="tab-pane active show">
              <h4 style={{ marginBottom: '15px' }}>Rate & Comment on Itinerary</h4>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmitItineraryReview} style={{ padding: '10px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label>Rating</label>
                  <div className="rating-buttons" style={{ marginTop: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleItineraryRatingChange(star)}
                        style={{
                          color: star <= itineraryRating ? "#ffd700" : "#e4e5e9",
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
                    placeholder="Share your experience with the itinerary..."
                    value={itineraryComment}
                    onChange={(e) => setItineraryComment(e.target.value)}
                    style={{ padding: '8px', width: '100%' }}
                  />
                </div>
                <button type="submit" className="btn-style bd-primary-btn radius-60 mt-3">
                  Submit Itinerary Review
                </button>
              </form>
            </div>
          )
        ) : (
          guideSubmitted ? (
            <div className="thank-you-message">
              <h4>Thank you for reviewing the tour guide! We appreciate it.</h4>
            </div>
          ) : (
            <div className="tab-pane active show">
              <h4 style={{ marginBottom: '15px' }}>Rate & Comment on Tour Guide</h4>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmitGuideReview} style={{ padding: '10px' }}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <label>Rating</label>
                  <div className="rating-buttons" style={{ marginTop: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleGuideRatingChange(star)}
                        style={{
                          color: star <= guideRating ? "#ffd700" : "#e4e5e9",
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
                    placeholder="Share your experience with the tour guide..."
                    value={guideComment}
                    onChange={(e) => setGuideComment(e.target.value)}
                    style={{ padding: '8px', width: '100%' }}
                  />
                </div>
                <button type="submit" className="btn-style bd-primary-btn radius-60 mt-3">
                  Submit Guide Review
                </button>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RatingTabArea;
