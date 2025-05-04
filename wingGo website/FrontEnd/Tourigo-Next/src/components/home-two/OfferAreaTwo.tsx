'use client'
import Image from 'next/image';
import React from 'react';
import offerShapeBg from '../../../public/assets/images/shapes/offer-bg-shape.png';
import offerShape from '../../../public/assets/images/shapes/offer-shape.png';
import bgImage from '../../../public/assets/images/offer/offer-img-3.png';
import { imageLoader } from '@/hooks/image-loader';
import CountUpContent from '@/elements/counter/CountUpContent';
import { counterData } from '@/data/counter-data';
import Link from 'next/link';

const OfferAreaTwo = () => {
    return (
        <>
            <section className="bd-offer-area section-space-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="offer-wrapper p-relative offer-thumb-bg offer-style-three image-bg"  style={{ backgroundImage: `url(${bgImage.src})` }}>
                                <div className="offer-mask">
                                    <Image src={offerShapeBg} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="mask" />
                                </div>
                                <div className="offer-shape">
                                    <Image src={offerShape} loader={imageLoader} style={{ width: 'auto', height: "auto" }} alt="shape" />
                                </div>
                                <div className="offer-content-wrap">
                                    <div className="offer-content">
                                        <div className="section-title-wrapper mb-30">
                                            <span className="section-subtitle color-warning mb-15">Get offer now</span>
                                            <h2 className="section-title white-text mb-20">Ultimate Adventure Awaits!</h2>
                                            <p>Share the core values and principles</p>
                                        </div>
                                        <div className="offer-btn">
                                            <Link href="/booking" className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60">
                                                <span className="bd-primary-btn-arrow arrow-right"><i className="fa-regular fa-arrow-right"></i></span>
                                                <span className="bd-primary-btn-text">Book Now</span>
                                                <span className="bd-primary-btn-circle"></span>
                                                <span className="bd-primary-btn-arrow arrow-left"><i className="fa-regular fa-arrow-right"></i></span>
                                           </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="counter-wrapper counter-style-two counter-top">
                        {
                            counterData && counterData.slice(0, 4).map(item => <div key={item.id} className="counter-item">
                                <div className="counter-content">
                                    <h2><span data-purecounter-duration="1" data-purecounter-end="900"
                                        className="purecounter"><CountUpContent number={item.counterNumber} text={`${item.counterTitle === '+'?'+': 'M+'}`} /></span>
                                    </h2>
                                    <p>{item.description}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default OfferAreaTwo;