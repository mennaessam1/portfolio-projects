import React from 'react';

const TourDetailsLeftPostForm = () => {
    return (
        <div className="post-comment-form">
            <div className="post-comments-title">
                <h4 className="mb-15">Leave a Review</h4>
                <span className="d-block mb-25">Your email address will not be
                    published. Required fields are
                    marked *</span>
            </div>
            <div className="tour-details-star-review-box">
                <div className="tour-details-star-review-box-single">
                    <p className="tour-details-star-review-box-text">Service</p>
                    <div className="tourigo-ratings-two">
                        <i className="fa fa-star active" data-value="1"></i>
                        <i className="fa fa-star active" data-value="2"></i>
                        <i className="fa fa-star active" data-value="3"></i>
                        <i className="fa fa-star active" data-value="4"></i>
                        <i className="fa fa-star active" data-value="5"></i>
                        <input type="hidden" name="rating" value="5" />
                    </div>
                </div>
                <div className="tour-details-star-review-box-single">
                    <p className="tour-details-star-review-box-text">Locations</p>
                    <div className="tourigo-ratings-two">
                        <i className="fa fa-star" data-value="1"></i>
                        <i className="fa fa-star" data-value="2"></i>
                        <i className="fa fa-star" data-value="3"></i>
                        <i className="fa fa-star" data-value="4"></i>
                        <i className="fa fa-star" data-value="5"></i>
                        <input type="hidden" name="rating" value="5" />
                    </div>
                </div>
                <div className="tour-details-star-review-box-single">
                    <p className="tour-details-star-review-box-text">Amenities</p>
                    <div className="tourigo-ratings-two">
                        <i className="fa fa-star" data-value="1"></i>
                        <i className="fa fa-star" data-value="2"></i>
                        <i className="fa fa-star" data-value="3"></i>
                        <i className="fa fa-star" data-value="4"></i>
                        <i className="fa fa-star" data-value="5"></i>
                        <input type="hidden" name="rating" value="5" />
                    </div>
                </div>
                <div className="tour-details-star-review-box-single">
                    <p className="tour-details-star-review-box-text">Prices</p>
                    <div className="tourigo-ratings-two">
                        <i className="fa fa-star" data-value="1"></i>
                        <i className="fa fa-star" data-value="2"></i>
                        <i className="fa fa-star" data-value="3"></i>
                        <i className="fa fa-star" data-value="4"></i>
                        <i className="fa fa-star" data-value="5"></i>
                        <input type="hidden" name="rating" value="5" />
                    </div>
                </div>
                <div className="tour-details-star-review-box-single">
                    <p className="tour-details-star-review-box-text">Food</p>
                    <div className="tourigo-ratings-two">
                        <i className="fa fa-star" data-value="1"></i>
                        <i className="fa fa-star" data-value="2"></i>
                        <i className="fa fa-star" data-value="3"></i>
                        <i className="fa fa-star" data-value="4"></i>
                        <i className="fa fa-star" data-value="5"></i>
                        <input type="hidden" name="rating" value="5" />
                    </div>
                </div>
            </div>
            <form>
                <div className="row gy-24">
                    <div className="col-xl-6">
                        <div className="input-box">
                            <input type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="input-box">
                            <input type="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="input-box">
                            <textarea cols={30} rows={10} placeholder="Type Comment here"></textarea>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="submit-btn">
                            <button type="button" className="bd-primary-btn btn-style has-arrow is-bg radius-60">
                                <span className="bd-primary-btn-arrow arrow-right"><i className="fa-regular fa-arrow-right"></i></span>
                                <span className="bd-primary-btn-text">Post
                                    Comment</span>
                                <span className="bd-primary-btn-circle"></span>
                                <span className="bd-primary-btn-arrow arrow-left"><i className="fa-regular fa-arrow-right"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TourDetailsLeftPostForm;