import React from 'react';

interface ErrorType{
    message: string;
}

const ErrorMessage = ({message}:ErrorType) => {
    return (
        <>
            <span className="error-message">{message}</span>
        </>
    );
};

export default ErrorMessage;