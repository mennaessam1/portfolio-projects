import { indexFaqData } from '@/data/faq-data';
import React from 'react';

const FaqAreaIndex = () => {
    return (
        <>
            <div className="faq-area section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-title-wrapper text-center section-title-space">
                                <span className="section-subtitle mb-10">ANY QUESTION</span>
                                <h2 className="section-title mb-15">Do you have any Question</h2>
                                <p className="description">Check out our FAQ section to see if we can help</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-24 justify-content-between">
                        <div className="col-lg-7 col-sm-12 col-12">
                            <div className="demo-faq">
                                <div className="accordion-wrapper faq-style-3">
                                    <div className="accordion" id="accordionExampleThree">
                                    {indexFaqData.map((faq, index) => (
                                        <div className="accordion-item" key={index}>
                                            <h6 className="accordion-header" id={`heading${faq.id}`}>
                                                <button className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`} aria-expanded={index === 0} aria-controls={`collapse${faq.id}`}>
                                                    <span>{`Q${index + 1}:`}</span> {faq.question}
                                                </button>
                                            </h6>
                                            <div id={`collapse${faq.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${faq.id}`} data-bs-parent="#accordionExampleThree">
                                                <div className="accordion-body">{faq.answer}</div>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12 col-12">
                            <div className="row gy-24">
                                <div className="col-lg-12 col-md-6">
                                    <div className="bd-landing-service">
                                        <div className="inner">
                                            <span className="inner-icon">
                                                <i className="icon-documentation"></i>
                                            </span>
                                            <div className="content">
                                                <h4 className="title mb-10">Online Documentation</h4>
                                                <a href="source/documentation" className="bd-primary-btn btn-style has-arrow is-bg radius-60">
                                                    <span className="bd-primary-btn-arrow arrow-right"><i className="fa-regular fa-arrow-right"></i></span>
                                                    <span className="bd-primary-btn-text">Documentation</span>
                                                    <span className="bd-primary-btn-circle"></span>
                                                    <span className="bd-primary-btn-arrow arrow-left"><i className="fa-regular fa-arrow-right"></i></span>
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-6">
                                    <div className="bd-landing-service">
                                        <div className="inner">
                                            <span className="inner-icon">
                                                <i className="icon-support"></i>
                                            </span>
                                            <div className="content">
                                                <h4 className="title mb-10">Dedicated Support</h4>
                                                <a href="https://support.bdevs.net/" className="bd-primary-btn btn-style has-arrow is-bg radius-60">
                                                    <span className="bd-primary-btn-arrow arrow-right"><i className="fa-regular fa-arrow-right"></i></span>
                                                    <span className="bd-primary-btn-text">Get Support</span>
                                                    <span className="bd-primary-btn-circle"></span>
                                                    <span className="bd-primary-btn-arrow arrow-left"><i className="fa-regular fa-arrow-right"></i></span>
                                                </a>

                                            </div>
                                        </div>
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

export default FaqAreaIndex;