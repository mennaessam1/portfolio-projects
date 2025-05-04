import React from 'react';

const AlertArea = () => {
    return (
        <>
            <div className="bd-alert-area section-space-top">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                            <div className="alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center mb-24" role="alert">
                                <div className="alert-left-content alert-confirm">
                                    <i className="fa-sharp fa-regular fa-check"></i>
                                    <span><strong>Thank you!</strong> Your booking is confirmed. Invoice Sent in your email
                                        address</span>
                                </div>
                                <button type="button" className="alert-close-btn alert-confirm" data-bs-dismiss="alert" aria-label="Close"><i className="fa-sharp fa-regular fa-x"></i></button>
                            </div>
                            <div className="alert alert-danger alert-dismissible fade show d-flex justify-content-between align-items-center mb-24" role="alert">
                                <div className="alert-left-content alert-danger">
                                    <i className="fa-sharp fa-regular fa-check"></i>
                                    <span><strong>Oops!</strong> Something is wrong. Please input your validate email address</span>
                                </div>
                                <button type="button" className="alert-close-btn alert-danger" data-bs-dismiss="alert" aria-label="Close"><i className="fa-sharp fa-regular fa-x"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlertArea;