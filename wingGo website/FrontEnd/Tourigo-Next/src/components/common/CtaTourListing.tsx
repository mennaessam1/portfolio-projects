'use client'
import Image from 'next/image';
import React from 'react';
import ctaStar from '../../../public/assets/images/shapes/cta-star.png';
import ctaEye from '../../../public/assets/images/shapes/cta-eye.png';
import ctaX from '../../../public/assets/images/shapes/cta-x.png';
import ctaLine from '../../../public/assets/images/shapes/cta-line.png';
import planeSix from '../../../public/assets/images/shapes/plane-6.png';
import ctaBgImg from '../../../public/assets/images/cta/cta-img-3.png';
import { imageLoader } from '@/hooks/image-loader';
import Link from 'next/link';

const CtaTourListing = () => {
    return (
        <>
            <section className="bd-cta-area section-space-small cta-image-bg image-bg p-relative fix" style={{backgroundImage: `url(${ctaBgImg.src})`}}>
                <div className="container">
                    <div className="cta-three-shape">
                        <div className="cta-three-shape-one p-absolute">
                            <Image src={ctaStar} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-two p-absolute">
                            <Image src={ctaEye} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-three p-absolute">
                            <Image src={ctaX} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-four p-absolute">
                            <Image src={ctaStar} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-five p-absolute">
                            <Image src={ctaEye} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-six p-absolute">
                            <Image src={ctaX} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-seven p-absolute">
                            <Image src={ctaLine} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                        <div className="cta-three-shape-eight p-absolute">
                            <Image src={planeSix} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape"/>
                        </div>
                    </div>
                    <div className="row gy-24 align-items-center justify-content-center">
                        <div className="col-xl-6 col-md-8">
                            <div className="cta-content-wrapper cta-style-three text-center position-relative z-index-5">
                                <span className="section-subtitle color-warning mb-15">Find New Places To Visit</span>
                                <h2 className="section-title white-text mb-20">Explore New Places</h2>
                                <p>Share the core values and principles that drive your company. <br/> Emphasize a commitment to custome.
                                </p>
                                <div className="cta-btn">
                                    <Link href="/booking" className="bd-primary-btn btn-style has-arrow is-bg btn-tertiary is-white radius-60">
                                        <span className="bd-primary-btn-arrow arrow-right"><i className="fa-regular fa-arrow-right"></i></span>
                                        <span className="bd-primary-btn-text">Explore Now</span>
                                        <span className="bd-primary-btn-circle"></span>
                                        <span className="bd-primary-btn-arrow arrow-left"><i className="fa-regular fa-arrow-right"></i></span>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CtaTourListing;