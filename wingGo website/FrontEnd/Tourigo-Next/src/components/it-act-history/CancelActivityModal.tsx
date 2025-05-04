// CancelActivityModal.tsx
import React from 'react';

interface CancelActivityModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const CancelActivityModal: React.FC<CancelActivityModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    width: '300px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h3>Cancel Activity</h3>
                <p>Are you sure you want to cancel this activity booking?</p>
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={onConfirm}
                        style={{
                            backgroundColor: '#ff5c5c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                        }}
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelActivityModal;
