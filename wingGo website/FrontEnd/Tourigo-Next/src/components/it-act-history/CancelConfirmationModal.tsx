// CancelConfirmationModal.tsx
import React from "react";

interface CancelConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

// CSS styles as JavaScript objects
const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center" as "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  confirmButton: {
    backgroundColor: "red",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "gray",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  console.log("CancelConfirmationModal rendered");
  return (
    <div style={styles.overlay}>
      <div style={styles.content}>
        <h2>Cancel Booking</h2>
        <p>Are you sure you want to cancel this booking?</p>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirmButton}>Yes, Cancel</button>
          <button onClick={onCancel} style={styles.cancelButton}>No, Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
