import { reviewAreaData } from '@/data/home/home-review-area';
import Image from 'next/image';
import React from 'react';

const ReviewArea = () => {
    return (
        <>
            <div className="customer-review-area section-space-top">
                <div className="container">
                    <div className="customer-review-title">
                        <div className="section-title-wrapper text-center">
                            <span className="section-subtitle mb-10">Customers review</span>
                            <h2 className="section-title">Our Satisfied Customers</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-12 overflow-hidden">
                            <div className="customer-review-wrapper">
                                <div className="customer-review-wrap">
                                    {
                                        reviewAreaData.length > 0 && (
                                            reviewAreaData.slice(0, 5).map(reviewData => <div key={reviewData.id} className="customer-review-style-1">
                                                <div className="content">
                                                    <div className="rating-icon">
                                                        <Image src={reviewData.img} alt="image" />
                                                    </div>
                                                    <p className="content-title">for <span>{reviewData.title}</span></p>
                                                    <p className="text">{reviewData.description}</p>
                                                    <div className="info">
                                                        <h5 className="title"> <span>by</span> {reviewData.info}</h5>
                                                    </div>
                                                </div>
                                            </div>)
                                        )
                                    }
                                </div>
                                <div className="customer-review-wrap">
                                {
                                        reviewAreaData.length > 0 && (
                                            reviewAreaData.slice(6, 11).map(reviewData => <div key={reviewData.id} className="customer-review-style-1">
                                                <div className="content">
                                                    <div className="rating-icon">
                                                        <Image src={reviewData.img} alt="image" />
                                                    </div>
                                                    <p className="content-title">for <span>{reviewData.title}</span></p>
                                                    <p className="text">{reviewData.description}</p>
                                                    <div className="info">
                                                        <h5 className="title"> <span>by</span> {reviewData.info}</h5>
                                                    </div>
                                                </div>
                                            </div>)
                                        )
                                    }
                                </div>
                                <div className="customer-review-wrap">
                                {
                                        reviewAreaData.length > 0 && (
                                            reviewAreaData.slice(12, 17).map(reviewData => <div key={reviewData.id} className="customer-review-style-1">
                                                <div className="content">
                                                    <div className="rating-icon">
                                                        <Image src={reviewData.img} alt="image" />
                                                    </div>
                                                    <p className="content-title">for <span>{reviewData.title}</span></p>
                                                    <p className="text">{reviewData.description}</p>
                                                    <div className="info">
                                                        <h5 className="title"> <span>by</span> {reviewData.info}</h5>
                                                    </div>
                                                </div>
                                            </div>)
                                        )
                                    }
                                </div>
                                <div className="customer-review-wrap">
                                {
                                        reviewAreaData.length > 0 && (
                                            reviewAreaData.slice(18, 23).map(reviewData => <div key={reviewData.id} className="customer-review-style-1">
                                                <div className="content">
                                                    <div className="rating-icon">
                                                        <Image src={reviewData.img} alt="image" />
                                                    </div>
                                                    <p className="content-title">for <span>{reviewData.title}</span></p>
                                                    <p className="text">{reviewData.description}</p>
                                                    <div className="info">
                                                        <h5 className="title"> <span>by</span> {reviewData.info}</h5>
                                                    </div>
                                                </div>
                                            </div>)
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewArea;