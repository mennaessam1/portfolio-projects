// RateCommentModal.tsx

import React from 'react';
import RatingTabArea from './RatingTabArea';

interface RateCommentModalProps {
  bookingData: any;
  touristId: string;
  itineraryId: string;
  tourGuideId: string; // Add tourGuideId as a prop
  onClose: () => void;
}

const RateCommentModal: React.FC<RateCommentModalProps> = ({ bookingData, touristId, itineraryId, tourGuideId, onClose }) => {
  if (!bookingData) return null;

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
        className="modal-dialog"
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '20px',
        }}
      >
        <div className="modal-content">
          <div
            className="modal-header"
            style={{
              borderBottom: '1px solid #ddd',
              paddingBottom: '10px',
              marginBottom: '15px',
            }}
          >
            <h5 className="modal-title">Rate & Comment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{ background: 'none', border: 'none', fontSize: '20px' }}
            >
              &times;
            </button>
          </div>
          <div className="modal-body" style={{ padding: '10px 0' }}>
            <RatingTabArea
              touristId={touristId}
              itineraryId={itineraryId}
              tourGuideId={tourGuideId} // Pass tourGuideId to RatingTabArea
              onSuccess={(msg) => console.log(msg)}
              onError={(msg) => console.log(msg)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCommentModal;
