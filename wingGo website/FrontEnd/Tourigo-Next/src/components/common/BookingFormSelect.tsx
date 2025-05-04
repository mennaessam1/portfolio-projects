import React from 'react';

const BookingFormSelect = () => {
    return (
        <>
            <div className="banner-booking-two">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-8 col-xl-10 col-lg-11">
                            <div className="banner-search-wrapper style-two wow bdFadeIn" data-wow-delay="1.2s">
                                <div className="banner-search-box">
                                    <div className="banner-search-form">
                                        <div className="banner-search-field has-separator d-flex align-items-center gap-10">
                                            <div className="search-icon-bg">
                                                <span><i className="fa-regular fa-location-dot"></i></span>
                                            </div>
                                            <div className="banner-search-item banner-select">
                                                <p className="b2 mb-0 fw-5">Where to</p>
                                                <div className="banner-search-select">
                                                    <select name="location" id="location">
                                                        <option>Search location</option>
                                                        <option>Australia</option>
                                                        <option>Portugal</option>
                                                        <option>Maldives</option>
                                                        <option>India</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="banner-search-field has-separator d-flex align-items-center gap-10">
                                            <div className="search-icon-bg">
                                                <span><i className="icon-cleander"></i></span>
                                            </div>
                                            <div className="banner-search-item">
                                                <p className="b2 mb-0 fw-5">Duration</p>
                                                <div className="banner-form-input">
                                                    <input className="form-control" id="selectingMultipleDates" type="text" placeholder="Select Your date" readOnly />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="banner-search-field d-flex align-items-center gap-10">
                                            <div className="search-icon-bg">
                                                <span><i className="fa-regular fa-location-dot"></i></span>
                                            </div>
                                            <div className="banner-search-item banner-select">
                                                <p className="b2 mb-0 fw-5">Tour Types</p>
                                                <div className="banner-search-select">
                                                    <select>
                                                        <option>Beach</option>
                                                        <option>Discovery</option>
                                                        <option>Adventure</option>
                                                        <option>Mountain</option>
                                                        <option>Wildlife</option>
                                                        <option>Forest</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner-search-button">
                                        <button type="submit" className="banner-btn banner-square-btn bd-btn btn-style radius-10"><span>
                                            <i className="fa-regular fa-magnifying-glass"></i></span> Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingFormSelect;