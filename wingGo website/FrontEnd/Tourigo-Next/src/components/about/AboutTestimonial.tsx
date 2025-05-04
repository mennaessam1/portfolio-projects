'use client'
import Image from 'next/image';
import React from 'react';
import { imageLoader } from '@/hooks/image-loader';
import { testimonialData } from '@/data/testimonial-data';

const AboutTestimonial = () => {
    return (
        <>
            <section className="bd-testimonial-area section-space">
                <div className="container">
                    <div className="row gy-24 align-items-center justify-content-center section-title-space">
                        <div className="col-lg-6 col-md-8">
                            <div className="section-title-wrapper text-center">
                                <span className="section-subtitle mb-10">Testimonials</span>
                                <h2 className="section-title">Our Client Testimonials</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-24 justify-content-between">
                        {
                            testimonialData && testimonialData.slice(19, 22).map(item => <div key={item.id} className="col-xxl-4 col-xl-4 col-lg-4">
                                <div className="testimonial-wrapper testimonial-style-three">
                                    <div className="testimonial-content p-relative">
                                        <div className="testimonial-avatar flex-wrap mb-25">
                                            <div className="testimonial-avatar-wrap">
                                                <div className="avatar-thumb">
                                                    <Image src={item.avatarImg} loader={imageLoader} style={{ width: '100%', height: "100%" }} alt=""/>
                                                </div>
                                                <div className="avatar-meta">
                                                    <h6 className="avatar-meta-title">{item.avatarTitle}</h6>
                                                    <p>{item.info}</p>
                                                </div>
                                            </div>
                                            <div className="testimonial-quot-icon">
                                                <i className="fa-solid fa-quote-right"></i>
                                            </div>
                                        </div>
                                        <p className="testimonial-desc">{item.description}</p>
                                        <div className="avatar-rating p-relative">
                                            <div className="fs-14 d-flex rating-color">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutTestimonial;