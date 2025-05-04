import React, { useEffect } from 'react';

interface NotificationModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`notification-modal ${type}`}>
            <p>{message}</p>
            <style jsx>{`
                .notification-modal {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    padding: 10px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    z-index: 1000;
                    opacity: 0.99;
                }
                .notification-modal.success {
                    background-color: #4caf50;
                }
                .notification-modal.error {
                    background-color: #f44336;
                }
            `}</style>
        </div>
    );
};

export default NotificationModal;
