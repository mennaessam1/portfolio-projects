import { offerData } from '@/data/homeOne/offer-data';
import Link from 'next/link';
import React from 'react';

const OfferArea = () => {
    return (
        <>
            <section className="bd-offer-area section-space-bottom">
                <div className="container">
                    <div className="row gy-24">
                        {
                            offerData && offerData.map(offer => <div key={offer.id} className={`col-xl-6 col-lg-6 col-md-12 wow ${offer.id === 1 ? 'bdFadeInLeft' : 'bdFadeInRight'}`}>
                                <div className="offer-wrapper p-relative offer-thumb-bg image-bg" style={{ backgroundImage: `url(${offer.img.src})` }}>
                                    <div className="offer-content-wrap">
                                        <div className="offer-content">
                                            <div className="section-title-wrapper mb-30">
                                                <span className="section-subtitle color-warning mb-15">Get offer now</span>
                                                <h2 className="section-title small white-text mb-20">Buy 1 Package,<br />Get 1 Free Now!</h2>
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
                            </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default OfferArea;