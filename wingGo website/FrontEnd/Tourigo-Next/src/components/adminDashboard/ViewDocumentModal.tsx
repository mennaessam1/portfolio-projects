import React from 'react';

interface ViewDocumentModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ pdfUrl, onClose }) => {
  if (!pdfUrl) return null;

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
          maxWidth: '900px',
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
            <h5 className="modal-title">View Document</h5>
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
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              style={{ border: 'none' }}
              title="Document Viewer"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;
